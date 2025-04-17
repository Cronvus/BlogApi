module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/warnings'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json'
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        },
    },
    rules: {
        "@typescript-eslint/semi": ["error", "never"],
        'import/no-unresolved': 'off',
        'semi': "off",
        '@typescript-eslint/no-unused-vars': "off",
        'react/react-in-jsx-scope': 'off',
        "no-use-before-define": "off",
        'import/no-named-as-default': 'off',
        "@typescript-eslint/no-use-before-define": ["error"],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/indent': ['error', 2],
        'import/extensions': ['error', 'never', {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never",
            'react-dom/client': 'never',
        }],
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: true
        }],
        'react/jsx-filename-extension': [1, { "extensions": [".tsx"] }],
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off'
    }
};
