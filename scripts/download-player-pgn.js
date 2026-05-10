import { writeFileSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { tmpdir } from 'os'
import { join } from 'path'

const player = process.argv[2]
if (!player) {
  console.error('Usage: node scripts/download-player-pgn.js <PlayerName>')
  process.exit(1)
}

const url = `https://www.pgnmentor.com/players/${player}.zip`
const tmpZip = join(tmpdir(), `${player}.zip`)
const outDir = 'pgn'

console.log(`Downloading ${url}...`)
const res = await fetch(url)
if (!res.ok) {
  console.error(`Error: HTTP ${res.status} — jugador no encontrado en PGNMentor.`)
  process.exit(1)
}

writeFileSync(tmpZip, Buffer.from(await res.arrayBuffer()))

mkdirSync(outDir, { recursive: true })
const unzipOutput = execSync(`unzip -o "${tmpZip}" -d "${outDir}"`, { encoding: 'utf8' })

const extracted = unzipOutput
  .split('\n')
  .filter(l => /^\s*(inflating|extracting):/.test(l))
  .map(l => l.replace(/^\s*(inflating|extracting):\s*/, '').trim())
  .filter(f => f.toLowerCase().endsWith('.pgn'))

if (extracted.length === 0) {
  console.error('No se encontraron archivos .pgn en el ZIP.')
  process.exit(1)
}

extracted.forEach(f => console.log(`EXTRACTED_PGN=${f}`))
