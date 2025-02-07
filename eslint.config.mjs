import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    root: true,
    env: {
      browser: true,
      es2020: true,
      node: true
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: false,
      tsconfigRootDir: __dirname
    },
    plugins: ['@typescript-eslint', 'prettier', 'react'],
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
});

const eslintConfig = [
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  )
];

export default eslintConfig;
