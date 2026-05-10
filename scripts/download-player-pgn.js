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
if (!res.ok) throw new Error(`HTTP ${res.status} — player not found on PGNMentor?`)

writeFileSync(tmpZip, Buffer.from(await res.arrayBuffer()))

mkdirSync(outDir, { recursive: true })
execSync(`unzip -o "${tmpZip}" -d "${outDir}"`, { stdio: 'inherit' })
