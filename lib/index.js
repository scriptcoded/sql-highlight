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
    clear: '\x1b[0m'
  }
}

const SPLIT_CHARS = '[^a-zA-Z_]'

const DEFAULT_KEYWORD = 'default'

const highlighters = [
  {
    name: 'keyword',
    group: 1,
    regex: new RegExp(`(^|${SPLIT_CHARS})(${keywords.join('|')})(?=${SPLIT_CHARS}|$)`, 'gi')
  },
  {
    name: 'special',
    regex: /(=|!=|%|\/|\*|-|,|;|:|\+|<|>)/g
  },
  {
    name: 'function',
    regex: /(\w+?)\(/g,
    trimEnd: 1
  },
  {
    name: 'number',
    regex: /(\b\d+(?:\.\d+)?)/g
  },
  {
    name: 'string',
    regex: /(['](?:\\'|.)*?[']|["](?:\\"|.)*?["]|[`](?:\\`|.)*?[`])/g
  },
  {
    name: 'bracket',
    regex: /([()])/g
  }
]

function getSegments (sqlString) {
  const matches = []

  for (const hl of highlighters) {
    let match

    // This is probably the one time when an assignment inside a condition makes sense
    // eslint-disable-next-line no-cond-assign
    while (match = hl.regex.exec(sqlString)) {
      let text = match[0]
      let boringLength = 0

      // If a specific group is requested, use that group instead, and make sure
      // we offset the index by the length of the preceding groups
      if (hl.group) {
        text = match[hl.group + 1]
        for (let i = 1; i <= hl.group; i++) {
          boringLength += match[i].length
        }
      }

      const trimmedText = hl.trimEnd
        ? text.substring(0, text.length - hl.trimEnd)
        : text
      matches.push({
        name: hl.name,
        start: match.index + boringLength,
        length: trimmedText.length
      })
    }
  }

  const sortedMatches = matches.slice().sort((a, b) => a.start - b.start)

  // filter/exclude nested matches (matches within the last match)
  const segments = []
  let upperBound = 0
  for (let i = 0; i < sortedMatches.length; i++) {
    if (sortedMatches[i].start < upperBound) { continue }

    // If no match, add a default segment
    if (sortedMatches[i].start > upperBound) {
      segments.push({
        name: DEFAULT_KEYWORD,
        content: sqlString.substring(upperBound, sortedMatches[i].start)
      })
    }

    segments.push({
      name: sortedMatches[i].name,
      content: sqlString.substring(
        sortedMatches[i].start,
        sortedMatches[i].start + sortedMatches[i].length
      )
    })
    upperBound = sortedMatches[i].start + sortedMatches[i].length
  }

  if (upperBound < sqlString.length - 1) {
    segments.push({
      name: DEFAULT_KEYWORD,
      content: sqlString.substring(
        upperBound,
        upperBound + sqlString.length + 1
      )
    })
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
      return options.colors[name] + content + options.colors.clear
    })
    .join('')
}

module.exports = {
  getSegments,
  highlight
}
