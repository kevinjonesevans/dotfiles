module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    },
    "plugins": [
    ],
    "globals": {

        "atom": true,
        "describe": true,
        "it": true,
        "expect": true
    },
    "rules": {
        "no-caller": "error",
        "no-catch-shadow": "error",
        "no-labels": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-implied-eval": "error",
        "no-iterator": "error",
        "no-label-var": "error",
        "no-multi-spaces": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-sequences": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-spaced-func": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unused-expressions": "error",
        "no-use-before-define": "error",
        "no-with": "error",
        "camelcase": "error",
        "comma-spacing": "error",
        "consistent-return": "error",
        "curly": ["error", "multi-or-nest", "consistent"],
        "dot-notation": ["error", { "allowKeywords": true }],
        "eol-last": ["error", "always"],
        "eqeqeq": "error",
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
        "new-parens": "error",
        "semi-spacing": ["error", {"before": false, "after": true}],
        "space-infix-ops": "error",
        "keyword-spacing": ["error", { "after": true, "before": true }],
        "space-unary-ops": ["error", { "words": true, "nonwords": false }],
        "yoda": ["error", "never"],
        "indent": ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-var": "error"
    }
};
