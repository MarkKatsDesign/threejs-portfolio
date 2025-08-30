import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Disable React prop validation for Three.js/R3F components
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            // Three.js object properties
            'intensity', 'position', 'angle', 'penumbra', 'decay', 'distance',
            'color', 'castShadow', 'receiveShadow', 'shadow-mapSize-width', 
            'shadow-mapSize-height', 'shadow-camera-far', 'shadow-camera-near',
            // R3F specific props
            'scale', 'rotation', 'position-x', 'position-y', 'position-z',
            'rotation-x', 'rotation-y', 'rotation-z', 'scale-x', 'scale-y', 'scale-z',
            // Geometry and material props
            'args', 'attach', 'geometry', 'material', 'transparent', 'opacity',
            // Camera and controls
            'fov', 'aspect', 'near', 'far', 'makeDefault', 'enableZoom', 
            'enablePan', 'enableRotate', 'minPolarAngle', 'maxPolarAngle',
            'autoRotate', 'autoRotateSpeed', 'target'
          ]
        }
      ],
    },
  },
]
