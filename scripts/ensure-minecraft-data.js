const fs = require('fs')
const cp = require('child_process')

const repo =
  process.env.MINECRAFT_DATA_REPO ||
  process.env.npm_package_config_minecraft_data_repo ||
  'https://github.com/SeaMooLab/minecraft-data.git'

const ref =
  process.env.MINECRAFT_DATA_REF ||
  process.env.npm_package_config_minecraft_data_ref ||
  'master'

const dir = 'minecraft-data'
const required = `${dir}/data/dataPaths.json`

function run (cmd, args, options = {}) {
  console.log(`> ${cmd} ${args.join(' ')}`)
  cp.execFileSync(cmd, args, { stdio: 'inherit', ...options })
}

if (!fs.existsSync(required)) {
  fs.rmSync(dir, { recursive: true, force: true })
  run('git', ['clone', '--no-checkout', '--filter=blob:none', repo, dir])
  run('git', ['fetch', '--depth=1', 'origin', ref], { cwd: dir })
  run('git', ['checkout', '--detach', 'FETCH_HEAD'], { cwd: dir })
} else {
  console.log(`minecraft-data already present at ${dir}`)
}
