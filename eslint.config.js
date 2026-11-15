import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintReact from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      // Unlike eslint-plugin-react, this does not flag React Three Fiber
      // props (args, skeleton, morphTargetInfluences, ...) as unknown.
      eslintReact.configs.recommended,
      reactHooks.configs.flat.recommended,
      // Both plugins implement hooks/compiler rules; keep react-hooks' version only.
      eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
])
