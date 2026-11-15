// Usage: node scripts/fbx-to-clips.mjs .
// Extracts the first animation clip from each Mixamo FBX and writes them as
// compact three.js AnimationClip JSON (mesh data is discarded).
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
const three = await import(pathToFileURL(join(root, 'node_modules/three/build/three.module.js')).href);
const { FBXLoader } = await import(pathToFileURL(join(root, 'node_modules/three/examples/jsm/loaders/FBXLoader.js')).href);

const names = ['idle', 'salute', 'clapping', 'victory', 'sitting', 'laying'];
const round = (arr, digits) => {
  const f = 10 ** digits;
  return Array.from(arr, (v) => Math.round(v * f) / f);
};

const loader = new FBXLoader();
const out = {};
let before = 0;
for (const name of names) {
  const file = join(root, 'assets-src/animations', `${name}.fbx`);
  before += statSync(file).size;
  const buf = readFileSync(file);
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const fbx = loader.parse(ab, '');
  const clip = fbx.animations[0].clone();
  clip.name = name;
  // Root "Armature" tracks have no matching node in developer.glb.
  clip.tracks = clip.tracks.filter((t) => !t.name.startsWith('Armature'));
  for (const t of clip.tracks) {
    const isPos = t.name.endsWith('.position');
    t.times = new Float32Array(round(t.times, 4));
    t.values = new Float32Array(round(t.values, isPos ? 3 : 4));
    t.optimize();
  }
  const json = three.AnimationClip.toJSON(clip);
  out[name] = json;
  console.log(name, 'tracks', clip.tracks.length, 'duration', clip.duration.toFixed(2));
}
const dest = join(root, 'public/models/animations/developer-animations.json');
writeFileSync(dest, JSON.stringify(out));
console.log('FBX total', (before / 1e6).toFixed(2), 'MB -> JSON', (statSync(dest).size / 1e6).toFixed(2), 'MB');
