const escapeHtml = require('../lib/escapeHtml')

describe('escapeHtml', () => {
  it('does not escape strings without special characters', () => {
    expect(escapeHtml('Hello, world!'))
      .toBe('Hello, world!')
  })

  it('escapes brackets', () => {
    expect(escapeHtml('<br />'))
      .toBe('&lt;br /&gt;')
  })

  it('escapes quotes', () => {
    expect(escapeHtml('"\''))
      .toBe('&quot;&#39;')
  })

  it('escapes ampersands', () => {
    expect(escapeHtml('&'))
      .toBe('&amp;')
  })

  it('keeps leading and trailing test', () => {
    expect(escapeHtml('leading & trailing'))
      .toBe('leading &amp; trailing')
  })

  it('escapes multiple segments', () => {
    expect(escapeHtml('> to >'))
      .toBe('&gt; to &gt;')
  })

  it('escapes complex string', () => {
    expect(escapeHtml('<div onClick="javascript:alert(\'inject\')">Hello, world! This, that & those.</div>'))
      .toBe('&lt;div onClick=&quot;javascript:alert(&#39;inject&#39;)&quot;&gt;Hello, world! This, that &amp; those.&lt;/div&gt;')
  })
})
