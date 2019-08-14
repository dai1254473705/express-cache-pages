module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs":true,
        "es6": true
    },
    "extends": ["eslint:recommended"],
    "plugins": ["promise"],
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "no-console":0,
        "consistent-return": 0,
        "no-use-before-define": 0,
        "no-shadow": 0,
        "no-else-return": 0,
        "no-unused-vars": 0,
        // "camelcase": 2,
        "max-len": [1, 200],
        "one-var": 0,
        "prefer-const": "error",
        "one-var-declaration-per-line": 0,
        "no-whitespace-before-property": 0,
        "space-before-function-paren": [2, "always"],
        "no-underscore-dangle": [2, { allow: ["__", "_id", "_fileName"] }],
        "radix": 0,
        "new-cap": 0,
        "wrap-iife": [2, "any"],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "keyword-spacing": 2,
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        'semi': [2, 'always'],
        'semi-spacing': [2, {
            'before': false,
            'after': true
        }],
        'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],
        'block-spacing': [2, 'always'],
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }],
        'arrow-parens':[2,'as-needed'],
        'require-await': [2],
        'linebreak-style': ["error",'unix'],
        'new-cap':"error",
        'no-mixed-spaces-and-tabs':"error",
        "no-trailing-spaces":'error',
        "object-curly-spacing":["error", "never"],
        'space-before-blocks': ["error", "always"],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": ["error", {"int32Hint": false}],
        "space-unary-ops": "error",
        "spaced-comment": ["error", "always"],
        "switch-colon-spacing": "error",
        'template-tag-spacing': ["error", "always"],
        "rest-spread-spacing": ["error", "always"],
        "template-curly-spacing": ["error", "never"],
        "indent": ["error", "tab"],
        "comma-spacing":["error", { "before": false, "after": true }]
    },
    "globals":{
        "StaticDomain": false,
        "StaticFilePath":false,
        "Config": false,
        "ZgCommon": false,
        "zgrequest": false,
        "WapCookie": false,
        "WebCookie": false,
        "scrollLoad": false,
        "wx": false,
        "checkDeviceAndIsLogin": false,
        "zgConfig": false,
        "stringBuilder": false,
        "OtherInfor": false,
        "RongIMClient": false,
        "RongIMLib": false,
        "$":false,
        "zgCommon":false,
        "pageGlobalConfig": false,
        "echarts":false,
        "scrollLoad": false,
        "webLoginAlert": false
    }
};