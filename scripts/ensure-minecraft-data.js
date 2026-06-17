const fs = require('fs')
const cp = require('child_process')

const repo = process.env.MINECRAFT_DATA_REPO || 'https://github.com/SeaMooLab/minecraft-data.git'
const ref = process.env.MINECRAFT_DATA_REF || 'master'
const dir = 'minecraft-data'
const required = `${dir}/data/dataPaths.json`

function run (cmd) {
  console.log(`> ${cmd}`)
  cp.execSync(cmd, { stdio: 'inherit' })
}

if (!fs.existsSync(required)) {
  fs.rmSync(dir, { recursive: true, force: true })
  run(`git clone --depth=1 --branch ${ref} ${repo} ${dir}`)
} else {
  console.log(`minecraft-data already present at ${dir}`)
}
