'use strict'

const defaultOptions = {
  html: false,
  classPrefix: 'sql-hl-',
  colors: {
    keyword: '\x1b[35m',
    function: '\x1b[31m',
    number: '\x1b[32m',
    string: '\x1b[32m',
    special: '\x1b[33m',
    bracket: '\x1b[33m'
  }
}
const keywordsUpper = [
  'PRAGMA', 'CREATE', 'EXISTS', 'INTEGER', 'PRIMARY', 'letCHAR',
  'DATETIME', 'NULL', 'REFERENCES', 'AND', 'AS', 'ASC', 'INDEX_LIST',
  'BETWEEN', 'BY', 'CASE', 'CURRENT_DATE', 'CURRENT_TIME', 'DELETE',
  'DESC', 'DISTINCT', 'EACH', 'ELSE', 'ELSEIF', 'FALSE', 'FOR', 'FROM',
  'GROUP', 'HAVING', 'IF', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS',
  'JOIN', 'KEY', 'KEYS', 'LEFT', 'LIKE', 'LIMIT', 'MATCH', 'NOT',
  'ON', 'OPTION', 'OR', 'ORDER', 'OUT', 'OUTER', 'REPLACE', 'TINYINT',
  'RIGHT', 'SELECT', 'SET', 'TABLE', 'THEN', 'TO', 'TRUE', 'UPDATE',
  'VALUES', 'WHEN', 'WHERE', 'UNSIGNED', 'CASCADE', 'UNIQUE', 'DEFAULT',
  'ENGINE', 'TEXT', 'auto_increment', 'SHOW', 'INDEX'
]
let keywordsLower = keywordsUpper.map(value => value.toLowerCase())
const keywords = [].concat(keywordsUpper, keywordsLower)

const clearStyle = '\x1b[0m'

module.exports = class Highlighter {
  constructor (_options) {
    this.options = Object.assign({}, defaultOptions, _options)

    this.unicodePattern = `{0}$1${clearStyle}`
    this.htmlPattern = `<span class="${this.options.classPrefix}{0}">$1</span>`
  }

  highlight (text) {
    let newText = text

    let rules = {
      special: /(=|%|\/|\*|-|,|;|:|\+|<|>)/g,
      function: {
        match: /(\w*?)\(/g,
        pattern: '{0}('
      },
      number: /(\d+)/g,
      string: /(['`].*?['`])/g,
      bracket: /([()])/g
    }

    // Remove 'Executing (default):' message
    newText = newText.replace(/Executing \(default\): /g, '')

    for (let key in rules) {
      let rule = rules[key]
      let match = rule
      let pattern = '{0}'

      if (typeof rule === 'function') {
        match = rule.match
        pattern = rule.pattern
      }

      let replacer

      if (!this.options.html) {
        replacer = this.unicodePattern.replace('{0}', this.options.colors[key])
      } else {
        replacer = this.htmlPattern.replace('{0}', key)
      }
      newText = newText.replace(match, pattern.replace('{0}', replacer))
      console.log(newText + '\n\n')
    }

    let replacer = !this.options.html
      ? this.unicodePattern.replace('{0}', this.options.colors.keyword)
      : this.htmlPattern.replace('{0}', 'keyword')

    // Keywords
    for (let i = 0; i < keywords.length; i++) {
      let regEx = new RegExp(`\\b(${keywords[i]})\\b`, 'g')
      newText = newText.replace(regEx, replacer)
    }

    return newText
  }
}
