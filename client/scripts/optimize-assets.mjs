import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logo = join(root, 'public/assets/edlumina-logo.png')
const fontsDir = join(root, 'public/fonts')
const assetsDir = join(root, 'public/assets')

const FONT_FILES = [
  'node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2',
  'node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2',
  'node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff2',
  'node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2',
  'node_modules/@fontsource/montserrat/files/montserrat-latin-ext-400-normal.woff2',
  'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
  'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2',
]

await mkdir(fontsDir, { recursive: true })
await mkdir(assetsDir, { recursive: true })

for (const relative of FONT_FILES) {
  const from = join(root, relative)
  const to = join(fontsDir, relative.split('/').pop())
  await copyFile(from, to)
}

const sizes = [96, 192, 360, 512]
for (const size of sizes) {
  await sharp(logo)
    .resize(size, size, { fit: 'cover' })
    .webp({ quality: 86, effort: 6 })
    .toFile(join(assetsDir, `logo-${size}.webp`))
}

await sharp(logo).resize(96, 96).png({ compressionLevel: 9 }).toFile(join(assetsDir, 'logo-96.png'))
await sharp(logo).resize(192, 192).png({ compressionLevel: 9 }).toFile(join(assetsDir, 'logo-192.png'))

console.log('Wrote public/fonts and responsive logo assets.')
