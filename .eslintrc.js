module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  env: {
    jest: true,
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "object-curly-newline": "off",
    "no-underscore-dangle": "warn",
    "camelcase": "warn",
    "react/destructuring-assignment": "warn",
    "class-methods-use-this": "off",
    "max-len": ["error", {"code": 120, "tabWidth": 2, "ignoreComments": true }],
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    "react/jsx-props-no-spreading": [2, {
      "custom": "ignore",
    }],
  },
  globals: {
    __DEV__: true,
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  settings: {
    react: {
      version: "detect"
    },
    // https://github.com/benmosher/eslint-plugin-import/issues/279
    "import/resolver": {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.android.js',
          '.android.jsx',
          '.ios.js',
          '.ios.jsx',
        ]
      }
    }
  }
};
