'use strict'

const keywords = require('./keywords')
const escapeHtml = require('./escapeHtml')

const DEFAULT_OPTIONS = {
  html: false,
  htmlEscaper: escapeHtml,
  classPrefix: 'sql-hl-',
  colors: {
    keyword: '\x1b[35m',
    function: '\x1b[31m',
    number: '\x1b[32m',
    string: '\x1b[32m',
    special: '\x1b[33m',
    bracket: '\x1b[33m',
    comment: '\x1b[2m\x1b[90m',
    clear: '\x1b[0m'
  }
}

const DEFAULT_KEYWORD = 'default'

const highlighters = [
  /\b(?<number>\d+(?:\.\d+)?)\b/,

  // Note: Repeating string escapes like 'sql''server' will also work as they are just repeating strings
  /(?<string>'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/,

  /(?<comment>--[^\n\r]*|#[^\n\r]*|\/\*(?:[^*]|\*(?!\/))*\*\/)/,

  // Future improvement: Comments should be allowed between the function name and the opening parenthesis
  /\b(?<function>\w+)(?=\s*\()/,

  /(?<bracket>[()])/,

  /(?<special>!=|[=%*/\-+,;:<>])/
]

function getRegexString (regex) {
  const str = regex.toString()
  return str.replace(/^\/|\/\w*$/g, '')
}

// Regex of the shape /(.*?)|((?<token1>...)|(?<token2>...)|...|$)/y
const tokenizer = new RegExp(
  '(.*?)(' +
  '\\b(?<keyword>' + keywords.join('|') + ')\\b|' +
  highlighters.map(getRegexString).join('|') +
  '|$)', // $ needed to to match "default" till the end of string
  'isy'
)

function getSegments (sqlString) {
  const segments = []
  let match

  // Reset the starting position
  tokenizer.lastIndex = 0

  // This is probably the one time when an assignment inside a condition makes sense
  // eslint-disable-next-line no-cond-assign
  while (match = tokenizer.exec(sqlString)) {
    if (match[1]) {
      segments.push({
        name: DEFAULT_KEYWORD,
        content: match[1]
      })
    }

    if (match[2]) {
      const name = Object.keys(match.groups).find(key => match.groups[key])
      segments.push({
        name,
        content: match.groups[name]
      })
    }

    // Stop at the end of string
    if (match.index + match[0].length >= sqlString.length) {
      break
    }
  }

  return segments
}

function highlight (sqlString, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)

  return getSegments(sqlString)
    .map(({ name, content }) => {
      if (name === DEFAULT_KEYWORD) {
        return content
      }
      if (options.html) {
        const escapedContent = options.htmlEscaper(content)
        return `<span class="${options.classPrefix}${name}">${escapedContent}</span>`
      }
      if (name === 'string') {
        content = JSON.stringify(content).slice(1, -1).replace(/\\"/g, '"')
      }
      return options.colors[name] + content + options.colors.clear
    })
    .join('')
}

module.exports = {
  getSegments,
  highlight,
  DEFAULT_OPTIONS
}
