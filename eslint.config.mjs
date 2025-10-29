import { fileURLToPath } from 'node:url'

import { configure } from '@iwsio/eslint-config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// discovers workspaces; exclude non-node packages.
export default configure({
  // provide a root directory for monorepo
  rootDir: __dirname,

  // discovers all workspaces in monorepo
  autoFindMonorepoPackages: true,

  // stylistic rules configuration; these are default from @iwsio/eslint-config except for indent
  stylisticInit: {
    braceStyle: '1tbs',
    commaDangle: 'never',
    indent: 2, // for tabs, use "tab"
    jsx: true,
    quotes: 'single',
    semi: false
  },
  // client-side projects; excluded from Node.JS specific rules
  excludeWorkspacesFromNodeRules: ['apps/web', 'packages/lib-ui']
})
