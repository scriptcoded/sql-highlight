const { highlight } = require('./index')

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

  it('integers', () => {
    expect(hlHtml('42'))
      .toBe('<span class="sql-hl-number">42</span>')
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
})
