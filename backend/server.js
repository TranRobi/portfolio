import express from 'express'
import cors from 'cors'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// needed because __dirname doesn't exist in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MESSAGES_FILE = path.join(__dirname, 'messages.json')
const PORT = process.env.PORT ?? 3001

const app = express()

// middleware
app.use(
  cors({
    // dev server + optional prod origin from .env
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      process.env.FRONTEND_ORIGIN ?? '',
    ].filter(Boolean),
  }),
)
app.use(express.json())

// read messages.json, return empty array if file missing
const readMessages = async () => {
  try {
    const raw = await fs.readFile(MESSAGES_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

// overwrite messages.json with updated data
const writeMessages = async (data) => {
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(data, null, 2), 'utf8')
}

// routes

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {}

  // check all fields are present
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' })
  }

  const entry = {
    id: Date.now(),
    receivedAt: new Date().toISOString(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    message: String(message).trim(),
    read: false,
  }

  try {
    const messages = await readMessages()
    messages.push(entry)
    await writeMessages(messages)
    console.log(`[contact] new message from ${entry.email} (id ${entry.id})`)
    return res.status(201).json({ success: true, id: entry.id })
  } catch (err) {
    console.error('[contact] failed to save:', err)
    return res.status(500).json({ error: 'Internal server error. Please try again.' })
  }
})

// returns all stored messages
app.get('/api/messages', async (_req, res) => {
  try {
    const messages = await readMessages()
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Could not read messages.' })
  }
})

app.listen(PORT, () => {
  console.log(`backend running on http://localhost:${PORT}`)
})
