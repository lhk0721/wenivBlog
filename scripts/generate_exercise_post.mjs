import fs from 'node:fs'
import path from 'node:path'
import { generateExercisePost } from '../app/src/utils/exercisePostGenerator.js'

function printUsage() {
    console.log('Usage: node scripts/generate_exercise_post.mjs <input-summary.json> [output.json]')
}

const [, , inputArg, outputArg] = process.argv

if (!inputArg) {
    printUsage()
    process.exit(1)
}

const inputPath = path.resolve(process.cwd(), inputArg)
const outputPath = outputArg
    ? path.resolve(process.cwd(), outputArg)
    : inputPath.replace(/-summary\.json$/i, '-post.json')

const rawInput = fs.readFileSync(inputPath, 'utf-8')
const postDraft = generateExercisePost(rawInput, { sourcePath: inputPath })

fs.writeFileSync(outputPath, JSON.stringify(postDraft, null, 2), 'utf-8')

console.log(`Wrote ${outputPath}`)
