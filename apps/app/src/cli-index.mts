import { program } from 'commander'
import { startup, version } from './startup.mjs'
import chalk from 'chalk'
import { work } from './work.mjs'

await startup()

program
  .name('sbtest')
  .description(`${chalk.whiteBright(`v${version()}`)} - CLI sandbox blog tool`)
  .version(version())
  .action(async (_) => {
    console.log(work())
  })

await program.parseAsync(process.argv)
