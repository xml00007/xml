module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'google',
  'globals': {
    'Promise': true,   // Promise 允许 Promise
    'debug': true,
    'expect': true,
  },
  'plugins': [
    'jest',
  ],
  // 自定义规则
  'rules': {
    'semi': ['error', 'always'],      // 必须以 ';' 号结尾
    'comma-dangle': [
      'error', {                      // 结尾逗号 ','
        'arrays': 'only-multiline',   // 多行','结尾
        'objects': 'only-multiline',  // 多行','结尾
        'imports': 'never',
        'exports': 'never',
        'functions': 'never',
      }],
    'valid-jsdoc': 0,                 // 不验证jsdoc
    'require-jsdoc': 0,               // jsdoc 非必须
    'one-var': 0,                     // 强制函数中的变量分开声明 否
    'new-cap': 0,                     // 要求构造函数首字母大写   否
    'camelcase': 0,                   // 驼峰式命名
    'arrow-parens': 0, // 箭头函数 必须有括号 关闭
    'no-unused-vars': 0,                     // 未使用的变量
    'spaced-comment': 1, // 注释与正文之间空格一格
    'max-len': [
      2, {
        code: 180,                    // 一行最多字符数
        tabWidth: 2,                  // tab键相当于2个空格
        ignoreUrls: true,
        ignorePattern: '^goog\.(module|require)',
      }],
    // 文件最在行数
    'max-lines': [
      'error',
      {
        max: 200,                       // 最大行数200
        'skipBlankLines': true,        // 忽略空白行
        'skipComments': true, //忽略只包含注释的行
      }],
  },
};
