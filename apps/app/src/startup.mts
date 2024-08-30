import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
let _version: string = 'unset'

export const version = () => _version

export const startup = async () => {
  // NOTE: normally I'd use this function to load any configuraiton or information required at startup.
  //  But in this case, we'll just read the verison from the package.json
  if (_version !== 'unset') return

  const packageRaw = readFileSync(join(__dirname, '../package.json'), { encoding: 'utf8' })
  const packageJSON = JSON.parse(packageRaw)
  _version = packageJSON.version as string
}
