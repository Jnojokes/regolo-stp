import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

/** Flat config: eslint-config-next 16 esporta già degli array, senza FlatCompat. */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  prettier,
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
]

export default eslintConfig
