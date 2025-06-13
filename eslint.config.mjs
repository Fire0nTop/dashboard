import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTs from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Main TypeScript configuration with strict any rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // Exception for specific folders - disable any rules
  {
    files: [
        'lib/api/**/*.ts', 'lib/api/**/*.tsx',
      'public/**/*.ts', 'public/**/*.tsx',
      'app/dev/**/*.ts', 'app/dev/**/*.tsx'],
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;