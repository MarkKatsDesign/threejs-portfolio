import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const nodeModule = (pattern) => new RegExp(`[\\\\/]node_modules[\\\\/]${pattern}[\\\\/]`)

const isThree = (id) => nodeModule('three').test(id)
// three.js's WebGPU/TSL builds are only used by the lazily loaded globe;
// keep them out of the eagerly loaded "three" chunk.
const isThreeWebGPU = (id) => isThree(id) && /three\.(webgpu|tsl)(\.nodes)?\.js$/.test(id)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Keep large, rarely-changing libraries in their own chunks so content
        // edits to the site don't invalidate them in visitors' caches. Other
        // dependencies stay with the code that imports them, so lazily loaded
        // ones (the globe) are not pulled into the initial download.
        codeSplitting: {
          groups: [
            { name: 'three', test: (id) => isThree(id) && !isThreeWebGPU(id), priority: 40 },
            {
              name: 'react-three',
              test: nodeModule('(@react-three|three-stdlib|three-mesh-bvh|troika-[^\\\\/]+|camera-controls|@monogrid|maath|meshline|stats-gl)'),
              priority: 30,
            },
            { name: 'react', test: nodeModule('(react|react-dom|scheduler)'), priority: 20 },
          ],
        },
      },
    },
    // The three.js core and the lazily loaded globe (three-globe + WebGPU build)
    // are each ~0.7–2 MB minified; warn only for unexpectedly large chunks.
    chunkSizeWarningLimit: 2500,
  },
})
