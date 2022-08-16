const { highlight, getSegments } = require('./lib')

const OPTIONS = {
  colors: {
    keyword: '[keyword]',
    function: '[function]',
    number: '[number]',
    string: '[string]',
    special: '[special]',
    bracket: '[bracket]',
    clear: '[clear]'
  }
}

const hlUni = query => highlight(query, OPTIONS)

const hlHtml = query => highlight(query, {
  ...OPTIONS,
  html: true
})

describe('unicode', () => {
  it('strings (single quotes)', () => {
    expect(hlUni("'Hello, world!'"))
      .toBe("[string]'Hello, world!'[clear]")
  })

  it('strings (double quotes)', () => {
    expect(hlUni('"Hello, world!"'))
      .toBe('[string]"Hello, world!"[clear]')
  })

  it('strings (mixing quotes)', () => {
    expect(hlUni('\'"`\' "\'`" `"\'`'))
      .toBe('[string]\'"`\'[clear] [string]"\'`"[clear] [string]`"\'`[clear]')
  })

  it('strings (scaping quotes)', () => {
    expect(hlUni('\'\\\'\' "\\"" `\\``'))
      .toBe('[string]\'\\\'\'[clear] [string]"\\""[clear] [string]`\\``[clear]')
  })

  it('integers', () => {
    expect(hlUni('42'))
      .toBe('[number]42[clear]')
  })

  it('decimals', () => {
    expect(hlUni('42.11'))
      .toBe('[number]42.11[clear]')
  })

  it('keywords (uppercase)', () => {
    expect(hlUni('SELECT'))
      .toBe('[keyword]SELECT[clear]')
  })

  it('keywords (lowercase)', () => {
    expect(hlUni('select'))
      .toBe('[keyword]select[clear]')
  })

  it('keywords (mixed case)', () => {
    expect(hlUni('SElect'))
      .toBe('[keyword]SElect[clear]')
  })

  it('special characters', () => {
    expect(hlUni('='))
      .toBe('[special]=[clear]')
  })

  it('brackets', () => {
    expect(hlUni('('))
      .toBe('[bracket]([clear]')
  })

  it('numbers within strings', () => {
    expect(hlUni("'34'"))
      .toBe("[string]'34'[clear]")
  })

  it('alphanumeric', () => {
    expect(hlUni('(f1)'))
      .toBe('[bracket]([clear]f1[bracket])[clear]')
  })

  it('functions', () => {
    expect(hlUni('COUNT(`id`)'))
      .toBe('[function]COUNT[clear][bracket]([clear][string]`id`[clear][bracket])[clear]')
  })

  it('basic query', () => {
    expect(hlUni("SELECT * FROM `users` WHERE `email` = 'test@example.com'"))
      .toBe("[keyword]SELECT[clear] [special]*[clear] [keyword]FROM[clear] [string]`users`[clear] [keyword]WHERE[clear] [string]`email`[clear] [special]=[clear] [string]'test@example.com'[clear]")
  })

  it('complex query', () => {
    expect(hlUni("SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `foo` = 'BAR' OR 1=1"))
      .toBe("[keyword]SELECT[clear] [function]COUNT[clear][bracket]([clear]id[bracket])[clear][special],[clear] [string]`id`[clear][special],[clear] [string]`username`[clear] [keyword]FROM[clear] [string]`users`[clear] [keyword]WHERE[clear] [string]`email`[clear] [special]=[clear] [string]'test@example.com'[clear] [keyword]AND[clear] [string]`foo`[clear] [special]=[clear] [string]'BAR'[clear] [keyword]OR[clear] [number]1[clear][special]=[clear][number]1[clear]")
  })

  it('query with nested segments (minus in string)', () => {
    expect(hlUni('DROP PROCEDURE IF EXISTS `some-database`.`some-table`;'))
      .toBe('[keyword]DROP[clear] [keyword]PROCEDURE[clear] [keyword]IF[clear] [keyword]EXISTS[clear] [string]`some-database`[clear].[string]`some-table`[clear][special];[clear]')
  })

  it('multiple queries', () => {
    expect(hlUni('SELECT * FROM a;SELECT * FROM b;'))
      .toBe('[keyword]SELECT[clear] [special]*[clear] [keyword]FROM[clear] a[special];[clear][keyword]SELECT[clear] [special]*[clear] [keyword]FROM[clear] b[special];[clear]')
  })
})

describe('html', () => {
  it('strings (single quotes)', () => {
    expect(hlHtml("'Hello, world!'"))
      .toBe('<span class="sql-hl-string">\'Hello, world!\'</span>')
  })

  it('strings (double quotes)', () => {
    expect(hlHtml('"Hello, world!"'))
      .toBe('<span class="sql-hl-string">"Hello, world!"</span>')
  })

  it('strings (mixing quotes)', () => {
    expect(hlHtml('\'"`\' "\'`" `"\'`'))
      .toBe('<span class="sql-hl-string">\'"`\'</span> <span class="sql-hl-string">"\'`"</span> <span class="sql-hl-string">`"\'`</span>')
  })

  it('strings (scaping quotes)', () => {
    expect(hlHtml('\'\\\'\' "\\"" `\\``'))
      .toBe('<span class="sql-hl-string">\'\\\'\'</span> <span class="sql-hl-string">"\\""</span> <span class="sql-hl-string">`\\``</span>')
  })

  it('integers', () => {
    expect(hlHtml('42'))
      .toBe('<span class="sql-hl-number">42</span>')
  })

  it('decimals', () => {
    expect(hlHtml('42.11'))
      .toBe('<span class="sql-hl-number">42.11</span>')
  })

  it('keywords (uppercase)', () => {
    expect(hlHtml('SELECT'))
      .toBe('<span class="sql-hl-keyword">SELECT</span>')
  })

  it('keywords (lowercase)', () => {
    expect(hlHtml('select'))
      .toBe('<span class="sql-hl-keyword">select</span>')
  })

  it('special characters', () => {
    expect(hlHtml('='))
      .toBe('<span class="sql-hl-special">=</span>')
  })

  it('brackets', () => {
    expect(hlHtml('('))
      .toBe('<span class="sql-hl-bracket">(</span>')
  })

  it('numbers within strings', () => {
    expect(hlHtml("'34'"))
      .toBe("<span class=\"sql-hl-string\">'34'</span>")
  })

  it('alphanumeric', () => {
    expect(hlHtml('(f1)'))
      .toBe('<span class="sql-hl-bracket">(</span>f1<span class="sql-hl-bracket">)</span>')
  })

  it('functions', () => {
    expect(hlHtml('COUNT(`id`)'))
      .toBe('<span class="sql-hl-function">COUNT</span><span class="sql-hl-bracket">(</span><span class="sql-hl-string">`id`</span><span class="sql-hl-bracket">)</span>')
  })

  it('basic query', () => {
    expect(hlHtml("SELECT * FROM `users` WHERE `email` = 'test@example.com'"))
      .toBe("<span class=\"sql-hl-keyword\">SELECT</span> <span class=\"sql-hl-special\">*</span> <span class=\"sql-hl-keyword\">FROM</span> <span class=\"sql-hl-string\">`users`</span> <span class=\"sql-hl-keyword\">WHERE</span> <span class=\"sql-hl-string\">`email`</span> <span class=\"sql-hl-special\">=</span> <span class=\"sql-hl-string\">'test@example.com'</span>")
  })

  it('complex query', () => {
    expect(hlHtml("SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `foo` = 'BAR' OR 1=1"))
      .toBe("<span class=\"sql-hl-keyword\">SELECT</span> <span class=\"sql-hl-function\">COUNT</span><span class=\"sql-hl-bracket\">(</span>id<span class=\"sql-hl-bracket\">)</span><span class=\"sql-hl-special\">,</span> <span class=\"sql-hl-string\">`id`</span><span class=\"sql-hl-special\">,</span> <span class=\"sql-hl-string\">`username`</span> <span class=\"sql-hl-keyword\">FROM</span> <span class=\"sql-hl-string\">`users`</span> <span class=\"sql-hl-keyword\">WHERE</span> <span class=\"sql-hl-string\">`email`</span> <span class=\"sql-hl-special\">=</span> <span class=\"sql-hl-string\">'test@example.com'</span> <span class=\"sql-hl-keyword\">AND</span> <span class=\"sql-hl-string\">`foo`</span> <span class=\"sql-hl-special\">=</span> <span class=\"sql-hl-string\">'BAR'</span> <span class=\"sql-hl-keyword\">OR</span> <span class=\"sql-hl-number\">1</span><span class=\"sql-hl-special\">=</span><span class=\"sql-hl-number\">1</span>")
  })

  it('query with identifiers without apostrophes', () => {
    expect(hlHtml('SELECT id FROM users'))
      .toBe('<span class="sql-hl-keyword">SELECT</span> id <span class="sql-hl-keyword">FROM</span> users')
  })

  it('query with nested segments (minus in string)', () => {
    expect(hlHtml('DROP PROCEDURE IF EXISTS `some-database`.`some-table`;'))
      .toBe('<span class="sql-hl-keyword">DROP</span> <span class="sql-hl-keyword">PROCEDURE</span> <span class="sql-hl-keyword">IF</span> <span class="sql-hl-keyword">EXISTS</span> <span class="sql-hl-string">`some-database`</span>.<span class="sql-hl-string">`some-table`</span><span class="sql-hl-special">;</span>')
  })

  it('multiple queries', () => {
    expect(hlHtml('SELECT * FROM a;SELECT * FROM b;'))
      .toBe('<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-special">*</span> <span class="sql-hl-keyword">FROM</span> a<span class="sql-hl-special">;</span><span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-special">*</span> <span class="sql-hl-keyword">FROM</span> b<span class="sql-hl-special">;</span>')
  })
})

describe('getSegments', () => {
  it('complex query', () => {
    expect(getSegments("SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `foo` = 'BAR' OR 1=1"))
      .toStrictEqual([
        { name: 'keyword', content: 'SELECT' },
        { name: 'default', content: ' ' },
        { name: 'function', content: 'COUNT' },
        { name: 'bracket', content: '(' },
        { name: 'default', content: 'id' },
        { name: 'bracket', content: ')' },
        { name: 'special', content: ',' },
        { name: 'default', content: ' ' },
        { name: 'string', content: '`id`' },
        { name: 'special', content: ',' },
        { name: 'default', content: ' ' },
        { name: 'string', content: '`username`' },
        { name: 'default', content: ' ' },
        { name: 'keyword', content: 'FROM' },
        { name: 'default', content: ' ' },
        { name: 'string', content: '`users`' },
        { name: 'default', content: ' ' },
        { name: 'keyword', content: 'WHERE' },
        { name: 'default', content: ' ' },
        { name: 'string', content: '`email`' },
        { name: 'default', content: ' ' },
        { name: 'special', content: '=' },
        { name: 'default', content: ' ' },
        { name: 'string', content: "'test@example.com'" },
        { name: 'default', content: ' ' },
        { name: 'keyword', content: 'AND' },
        { name: 'default', content: ' ' },
        { name: 'string', content: '`foo`' },
        { name: 'default', content: ' ' },
        { name: 'special', content: '=' },
        { name: 'default', content: ' ' },
        { name: 'string', content: "'BAR'" },
        { name: 'default', content: ' ' },
        { name: 'keyword', content: 'OR' },
        { name: 'default', content: ' ' },
        { name: 'number', content: '1' },
        { name: 'special', content: '=' },
        { name: 'number', content: '1' }
      ])
  })
})
