// Run `pnpm generate:pasta-physics` after changing a pasta SVG.
// Only the generated geometry ships to the browser; tracing runs at build time.
import { readFile, readdir, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import decomp from "poly-decomp"

const root = new URL("../", import.meta.url)
const artwork = new URL("public/pasta/", root)
const output = new URL("lib/pasta-collision-shapes.json", root)

function signedArea(points) {
  return (
    points.reduce((area, [x, y], index) => {
      const next = points[(index + 1) % points.length]
      return area + x * next[1] - next[0] * y
    }, 0) / 2
  )
}

function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const length = dx * dx + dy * dy
  const t = length
    ? Math.max(
        0,
        Math.min(
          1,
          ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / length
        )
      )
    : 0
  return Math.hypot(point[0] - start[0] - t * dx, point[1] - start[1] - t * dy)
}

function simplifyLine(points, tolerance) {
  let furthest = 0
  let distance = tolerance
  for (let i = 1; i < points.length - 1; i++) {
    const candidate = distanceToSegment(points[i], points[0], points.at(-1))
    if (candidate > distance) {
      distance = candidate
      furthest = i
    }
  }
  if (!furthest) return [points[0], points.at(-1)]
  return [
    ...simplifyLine(points.slice(0, furthest + 1), tolerance).slice(0, -1),
    ...simplifyLine(points.slice(furthest), tolerance),
  ]
}

function simplifyLoop(points, tolerance) {
  let opposite = 1
  for (let i = 2; i < points.length; i++) {
    if (
      Math.hypot(points[i][0] - points[0][0], points[i][1] - points[0][1]) >
      Math.hypot(
        points[opposite][0] - points[0][0],
        points[opposite][1] - points[0][1]
      )
    )
      opposite = i
  }
  return [
    ...simplifyLine(points.slice(0, opposite + 1), tolerance).slice(0, -1),
    ...simplifyLine([...points.slice(opposite), points[0]], tolerance).slice(
      0,
      -1
    ),
  ]
}

// Trace the union of all opaque SVG paths, rather than their separate details.
function traceOutline(data, width, height, channels) {
  const edges = new Map()
  const solid = (x, y) =>
    x >= 0 &&
    y >= 0 &&
    x < width &&
    y < height &&
    data[(y * width + x) * channels + channels - 1] >= 96
  const add = (start, end) => {
    const key = start.join(",")
    const candidates = edges.get(key) ?? []
    candidates.push(end)
    edges.set(key, candidates)
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!solid(x, y)) continue
      if (!solid(x, y - 1)) add([x, y], [x + 1, y])
      if (!solid(x + 1, y)) add([x + 1, y], [x + 1, y + 1])
      if (!solid(x, y + 1)) add([x + 1, y + 1], [x, y + 1])
      if (!solid(x - 1, y)) add([x, y + 1], [x, y])
    }
  }

  const loops = []
  while (edges.size) {
    const key = edges.keys().next().value
    const start = key.split(",").map(Number)
    let point = start
    let direction = [1, 0]
    const loop = []
    do {
      loop.push(point)
      const pointKey = point.join(",")
      const candidates = edges.get(pointKey)
      if (!candidates?.length) throw new Error("The silhouette contour is open")
      // Prefer right turns at diagonal pixel junctions to keep loops separate.
      const turnScore = (next) => {
        const dx = next[0] - point[0]
        const dy = next[1] - point[1]
        const cross = direction[0] * dy - direction[1] * dx
        const dot = direction[0] * dx + direction[1] * dy
        return cross > 0 ? 3 : dot > 0 ? 2 : cross < 0 ? 1 : 0
      }
      candidates.sort((a, b) => turnScore(b) - turnScore(a))
      const next = candidates.shift()
      if (!candidates.length) edges.delete(pointKey)
      direction = [next[0] - point[0], next[1] - point[1]]
      point = next
    } while (point[0] !== start[0] || point[1] !== start[1])
    loops.push(loop)
  }
  // Discard interior holes and detached decorative flecks.
  return loops.sort(
    (a, b) => Math.abs(signedArea(b)) - Math.abs(signedArea(a))
  )[0]
}

const files = (await readdir(artwork))
  .filter((file) =>
    /^(fusilli-0[123]|(?:penne|rigatoni|orecchiette|cavatelli|garganelli)-[123])\.svg$/.test(
      file
    )
  )
  .sort()
const shapes = {}
for (const file of files) {
  const svg = await readFile(new URL(file, artwork))
  const metadata = await sharp(svg).metadata()
  const { data, info } = await sharp(svg)
    .resize(320, 320, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const outline = traceOutline(data, info.width, info.height, info.channels)
  const polygon = simplifyLoop(outline, 2)
  decomp.makeCCW(polygon)
  decomp.removeCollinearPoints(polygon, 0.01)
  if (!decomp.isSimple(polygon))
    throw new Error(`${file}: silhouette intersects itself`)
  const parts = decomp.quickDecomp(polygon)
  const area = parts.reduce(
    (total, part) => total + Math.abs(signedArea(part)),
    0
  )
  if (Math.abs(area - Math.abs(signedArea(polygon))) > 0.01) {
    throw new Error(`${file}: decomposition changed the silhouette area`)
  }
  shapes[file.replace(".svg", "")] = {
    width: metadata.width,
    height: metadata.height,
    parts: parts.map((part) =>
      part.map(([x, y]) => [
        Number((x / info.width).toFixed(6)),
        Number((y / info.height).toFixed(6)),
      ])
    ),
  }
  console.log(
    `${file}: ${polygon.length} outline vertices, ${parts.length} convex parts`
  )
}
await writeFile(output, JSON.stringify(shapes, null, 2) + "\n")
console.log(`Wrote ${fileURLToPath(output)}`)
