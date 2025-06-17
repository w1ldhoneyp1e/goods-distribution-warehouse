import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import importNewlines from 'eslint-plugin-import-newlines'
import jsonc from 'eslint-plugin-jsonc'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import yml from 'eslint-plugin-yml'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        // Global ignores
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            'build/**',
            '.cache/**',
            'tailwind.config.js',
            'postcss.config.js',
            'src/lib/utils.ts',
        ],
    },

    // Base configurations for all TypeScript/JavaScript files
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{js,cjs,mjs,ts,tsx}'],
        plugins: {
            '@stylistic': stylistic,
            'import': importPlugin,
            'import-newlines': importNewlines,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            // Your custom rules can go here
            '@stylistic/indent': ['error', 4],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/object-curly-spacing': ['error', 'never'],
            // Add other base/stylistic/import rules as needed
            'import/order': [
                'error',
                {
                    'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    'alphabetize': {order: 'asc', caseInsensitive: true},
                },
            ],
            'import-newlines/enforce': ['error', {'items': 3, 'semi': false}],
        },
    },

    // Configuration for React files
    {
        files: ['**/*.{tsx,jsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            // Your custom React rules
            'react/prop-types': 'off',
        },
    },
	
    // Configuration for JSON files
    ...jsonc.configs['flat/recommended-with-jsonc'].map(config => ({
        ...config,
        files: ['**/*.json'],
    })),

    // Configuration for YAML files
    ...yml.configs['flat/recommended'].map(config => ({
        ...config,
        files: ['**/*.{yaml,yml}'],
    })),
	
    // Final override to provide parser services for type-aware rules
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                project: true,
            },
        },
        rules: {
            // Add any rules that require type information here
            '@typescript-eslint/await-thenable': 'error',
        }
    }
) 