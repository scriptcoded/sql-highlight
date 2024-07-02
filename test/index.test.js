const { describe, it, expect } = require('@jest/globals');

const { highlight, getSegments } = require('../lib');

const OPTIONS = {
  colors: {
    keyword: '[keyword]',
    function: '[function]',
    number: '[number]',
    string: '[string]',
    identifier: '[identifier]',
    special: '[special]',
    bracket: '[bracket]',
    comment: '[comment]',
    clear: '[clear]'
  }
};

const hlUni = (query) => highlight(query, OPTIONS);

const hlHtml = (query) =>
  highlight(query, {
    ...OPTIONS,
    html: true
  });

describe('unicode', () => {
  it('strings (single quotes)', () => {
    expect(hlUni("'Hello, world!'")).toBe("[string]'Hello, world!'[clear]");
  });

  it('strings (double quotes)', () => {
    expect(hlUni('"Hello, world!"')).toBe('[string]"Hello, world!"[clear]');
  });

  it('strings (mixing quotes)', () => {
    expect(hlUni('\'"`\' "\'`" `"\'`')).toBe(
      '[string]\'"`\'[clear] [string]"\'`"[clear] [identifier]`"\'`[clear]'
    );
  });

  it('strings (escaping quotes)', () => {
    expect(hlUni('\'\\\'\' "\\"" `\\``')).toBe(
      '[string]\'\\\'\'[clear] [string]"\\""[clear] [identifier]`\\``[clear]'
    );
  });

  it('integers', () => {
    expect(hlUni('42')).toBe('[number]42[clear]');
  });

  it('decimals', () => {
    expect(hlUni('42.11')).toBe('[number]42.11[clear]');
  });

  it('keywords (uppercase)', () => {
    expect(hlUni('SELECT')).toBe('[keyword]SELECT[clear]');
  });

  it('keywords (lowercase)', () => {
    expect(hlUni('select')).toBe('[keyword]select[clear]');
  });

  it('keywords (mixed case)', () => {
    expect(hlUni('SElect')).toBe('[keyword]SElect[clear]');
  });

  it('special characters', () => {
    expect(hlUni('=')).toBe('[special]=[clear]');
  });

  it('brackets', () => {
    expect(hlUni('(')).toBe('[bracket]([clear]');
  });

  it('numbers within strings', () => {
    expect(hlUni("'34'")).toBe("[string]'34'[clear]");
  });

  it('alphanumeric', () => {
    expect(hlUni('(f1)')).toBe(
      '[bracket]([clear][identifier]f1[clear][bracket])[clear]'
    );
  });

  it('functions', () => {
    expect(hlUni('COUNT(`id`)')).toBe(
      '[function]COUNT[clear][bracket]([clear][identifier]`id`[clear][bracket])[clear]'
    );
  });

  it('basic query', () => {
    expect(
      hlUni("SELECT * FROM `users` WHERE `email` = 'test@example.com'")
    ).toBe(
      "[keyword]SELECT[clear] [special]*[clear] [keyword]FROM[clear] [identifier]`users`[clear] [keyword]WHERE[clear] [identifier]`email`[clear] [special]=[clear] [string]'test@example.com'[clear]"
    );
  });

  it('complex query', () => {
    expect(
      hlUni(
        "SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `foo` = 'BAR' OR 1=1"
      )
    ).toBe(
      "[keyword]SELECT[clear] [function]COUNT[clear][bracket]([clear][identifier]id[clear][bracket])[clear][special],[clear] [identifier]`id`[clear][special],[clear] [identifier]`username`[clear] [keyword]FROM[clear] [identifier]`users`[clear] [keyword]WHERE[clear] [identifier]`email`[clear] [special]=[clear] [string]'test@example.com'[clear] [keyword]AND[clear] [identifier]`foo`[clear] [special]=[clear] [string]'BAR'[clear] [keyword]OR[clear] [number]1[clear][special]=[clear][number]1[clear]"
    );
  });

  it('query with identifiers without apostrophes', () => {
    expect(hlUni('SELECT id FROM users')).toBe(
      '[keyword]SELECT[clear] [identifier]id[clear] [keyword]FROM[clear] [identifier]users[clear]'
    );
  });

  it('query with nested segments (minus in string)', () => {
    expect(
      hlUni('DROP PROCEDURE IF EXISTS `some-database`.`some-table`;')
    ).toBe(
      '[keyword]DROP[clear] [keyword]PROCEDURE[clear] [keyword]IF[clear] [keyword]EXISTS[clear] [identifier]`some-database`[clear][special].[clear][identifier]`some-table`[clear][special];[clear]'
    );
  });

  it('multiple queries', () => {
    expect(hlUni('SELECT * FROM a;SELECT * FROM b;')).toBe(
      '[keyword]SELECT[clear] [special]*[clear] [keyword]FROM[clear] [identifier]a[clear][special];[clear][keyword]SELECT[clear] [special]*[clear] [keyword]FROM[clear] [identifier]b[clear][special];[clear]'
    );
  });

  it('comment single line', () => {
    expect(
      hlUni(
        '-- comment 1 "comment" /* still */ comment 2\nSELECT `not comment`; -- comment 3'
      )
    ).toBe(
      '[comment]-- comment 1 "comment" /* still */ comment 2[clear]\n[keyword]SELECT[clear] [identifier]`not comment`[clear][special];[clear] [comment]-- comment 3[clear]'
    );
  });

  it('comment mysql', () => {
    expect(
      hlUni(
        '# comment 1 "comment" /* still */ comment 2\nSELECT `not comment`; # comment 3'
      )
    ).toBe(
      '[comment]# comment 1 "comment" /* still */ comment 2[clear]\n[keyword]SELECT[clear] [identifier]`not comment`[clear][special];[clear] [comment]# comment 3[clear]'
    );
  });

  it('comment multiline', () => {
    expect(
      hlUni(
        'SELECT /* this is, a "comment" */ "not /*comment*/" /***also*comment***/'
      )
    ).toBe(
      '[keyword]SELECT[clear] [comment]/* this is, a "comment" */[clear] [string]"not /*comment*/"[clear] [comment]/***also*comment***/[clear]'
    );
  });

  it('not a comment', () => {
    expect(hlUni('"id -- not comment /* still */ not"')).toBe(
      '[string]"id -- not comment /* still */ not"[clear]'
    );
  });
});

describe('html', () => {
  it('strings (single quotes)', () => {
    expect(hlHtml("'Hello, world!'")).toBe(
      '<span class="sql-hl-string">&#39;Hello, world!&#39;</span>'
    );
  });

  it('strings (double quotes)', () => {
    expect(hlHtml('"Hello, world!"')).toBe(
      '<span class="sql-hl-string">&quot;Hello, world!&quot;</span>'
    );
  });

  it('strings (mixing quotes)', () => {
    expect(hlHtml('\'"`\' "\'`" `"\'`')).toBe(
      '<span class="sql-hl-string">&#39;&quot;`&#39;</span> <span class="sql-hl-string">&quot;&#39;`&quot;</span> <span class="sql-hl-identifier">`&quot;&#39;`</span>'
    );
  });

  it('strings (scaping quotes)', () => {
    expect(hlHtml('\'\\\'\' "\\"" `\\``')).toBe(
      '<span class="sql-hl-string">&#39;\\&#39;&#39;</span> <span class="sql-hl-string">&quot;\\&quot;&quot;</span> <span class="sql-hl-identifier">`\\``</span>'
    );
  });

  it('integers', () => {
    expect(hlHtml('42')).toBe('<span class="sql-hl-number">42</span>');
  });

  it('decimals', () => {
    expect(hlHtml('42.11')).toBe('<span class="sql-hl-number">42.11</span>');
  });

  it('keywords (uppercase)', () => {
    expect(hlHtml('SELECT')).toBe('<span class="sql-hl-keyword">SELECT</span>');
  });

  it('keywords (lowercase)', () => {
    expect(hlHtml('select')).toBe('<span class="sql-hl-keyword">select</span>');
  });

  it('special characters', () => {
    expect(hlHtml('=')).toBe('<span class="sql-hl-special">=</span>');
  });

  it('brackets', () => {
    expect(hlHtml('(')).toBe('<span class="sql-hl-bracket">(</span>');
  });

  it('numbers within strings', () => {
    expect(hlHtml("'34'")).toBe(
      '<span class="sql-hl-string">&#39;34&#39;</span>'
    );
  });

  it('alphanumeric', () => {
    expect(hlHtml('(f1)')).toBe(
      '<span class="sql-hl-bracket">(</span><span class="sql-hl-identifier">f1</span><span class="sql-hl-bracket">)</span>'
    );
  });

  it('functions', () => {
    expect(hlHtml('COUNT(`id`)')).toBe(
      '<span class="sql-hl-function">COUNT</span><span class="sql-hl-bracket">(</span><span class="sql-hl-identifier">`id`</span><span class="sql-hl-bracket">)</span>'
    );
  });

  it('basic query', () => {
    expect(
      hlHtml("SELECT * FROM `users` WHERE `email` = 'test@example.com'")
    ).toBe(
      '<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-special">*</span> <span class="sql-hl-keyword">FROM</span> <span class="sql-hl-identifier">`users`</span> <span class="sql-hl-keyword">WHERE</span> <span class="sql-hl-identifier">`email`</span> <span class="sql-hl-special">=</span> <span class="sql-hl-string">&#39;test@example.com&#39;</span>'
    );
  });

  it('complex query', () => {
    expect(
      hlHtml(
        "SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `foo` = 'BAR' OR 1=1"
      )
    ).toBe(
      '<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-function">COUNT</span><span class="sql-hl-bracket">(</span><span class="sql-hl-identifier">id</span><span class="sql-hl-bracket">)</span><span class="sql-hl-special">,</span> <span class="sql-hl-identifier">`id`</span><span class="sql-hl-special">,</span> <span class="sql-hl-identifier">`username`</span> <span class="sql-hl-keyword">FROM</span> <span class="sql-hl-identifier">`users`</span> <span class="sql-hl-keyword">WHERE</span> <span class="sql-hl-identifier">`email`</span> <span class="sql-hl-special">=</span> <span class="sql-hl-string">&#39;test@example.com&#39;</span> <span class="sql-hl-keyword">AND</span> <span class="sql-hl-identifier">`foo`</span> <span class="sql-hl-special">=</span> <span class="sql-hl-string">&#39;BAR&#39;</span> <span class="sql-hl-keyword">OR</span> <span class="sql-hl-number">1</span><span class="sql-hl-special">=</span><span class="sql-hl-number">1</span>'
    );
  });

  it('query with identifiers without apostrophes', () => {
    expect(hlHtml('SELECT id FROM users')).toBe(
      '<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-identifier">id</span> <span class="sql-hl-keyword">FROM</span> <span class="sql-hl-identifier">users</span>'
    );
  });

  it('query with nested segments (minus in string)', () => {
    expect(
      hlHtml('DROP PROCEDURE IF EXISTS `some-database`.`some-table`;')
    ).toBe(
      '<span class="sql-hl-keyword">DROP</span> <span class="sql-hl-keyword">PROCEDURE</span> <span class="sql-hl-keyword">IF</span> <span class="sql-hl-keyword">EXISTS</span> <span class="sql-hl-identifier">`some-database`</span><span class="sql-hl-special">.</span><span class="sql-hl-identifier">`some-table`</span><span class="sql-hl-special">;</span>'
    );
  });

  it('multiple queries', () => {
    expect(hlHtml('SELECT * FROM a;SELECT * FROM b;')).toBe(
      '<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-special">*</span> <span class="sql-hl-keyword">FROM</span> <span class="sql-hl-identifier">a</span><span class="sql-hl-special">;</span><span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-special">*</span> <span class="sql-hl-keyword">FROM</span> <span class="sql-hl-identifier">b</span><span class="sql-hl-special">;</span>'
    );
  });

  it('escapes HTML entities', () => {
    expect(
      hlHtml("select * from a where b = 'array<map<string,string>>';")
    ).toBe(
      '<span class="sql-hl-keyword">select</span> <span class="sql-hl-special">*</span> <span class="sql-hl-keyword">from</span> <span class="sql-hl-identifier">a</span> <span class="sql-hl-keyword">where</span> <span class="sql-hl-identifier">b</span> <span class="sql-hl-special">=</span> <span class="sql-hl-string">&#39;array&lt;map&lt;string,string&gt;&gt;&#39;</span><span class="sql-hl-special">;</span>'
    );
  });

  it('comment single line', () => {
    expect(
      hlHtml(
        '-- comment 1 "comment" /* still */ comment 2\nSELECT `not comment`; -- comment 3'
      )
    ).toBe(
      '<span class="sql-hl-comment">-- comment 1 &quot;comment&quot; /* still */ comment 2</span>\n<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-identifier">`not comment`</span><span class="sql-hl-special">;</span> <span class="sql-hl-comment">-- comment 3</span>'
    );
  });

  it('comment mysql', () => {
    expect(
      hlHtml(
        '# comment 1 "comment" /* still */ comment 2\nSELECT `not comment`; # comment 3'
      )
    ).toBe(
      '<span class="sql-hl-comment"># comment 1 &quot;comment&quot; /* still */ comment 2</span>\n<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-identifier">`not comment`</span><span class="sql-hl-special">;</span> <span class="sql-hl-comment"># comment 3</span>'
    );
  });

  it('comment multiline', () => {
    expect(
      hlHtml(
        'SELECT /* this is, a "comment" */ "not /*comment*/" /***also*comment***/'
      )
    ).toBe(
      '<span class="sql-hl-keyword">SELECT</span> <span class="sql-hl-comment">/* this is, a &quot;comment&quot; */</span> <span class="sql-hl-string">&quot;not /*comment*/&quot;</span> <span class="sql-hl-comment">/***also*comment***/</span>'
    );
  });

  it('not a comment', () => {
    expect(hlHtml('"id -- not comment /* still */ not"')).toBe(
      '<span class="sql-hl-string">&quot;id -- not comment /* still */ not&quot;</span>'
    );
  });
});

describe('getSegments', () => {
  // Test that we can parse all forms of numbers.
  // See https://dev.mysql.com/doc/refman/8.0/en/number-literals.html for the syntax (at least for MYSQL).
  it('numbers', () => {
    expect(getSegments('34 - -.5 + +0.5 * 1.23E45 / 4E-3')).toStrictEqual([
      { name: 'number', content: '34' },
      { name: 'whitespace', content: ' ' },
      { name: 'special', content: '-' },
      { name: 'whitespace', content: ' ' },
      { name: 'number', content: '-.5' },
      { name: 'whitespace', content: ' ' },
      { name: 'special', content: '+' },
      { name: 'whitespace', content: ' ' },
      { name: 'number', content: '+0.5' },
      { name: 'whitespace', content: ' ' },
      { name: 'special', content: '*' },
      { name: 'whitespace', content: ' ' },
      { name: 'number', content: '1.23E45' },
      { name: 'whitespace', content: ' ' },
      { name: 'special', content: '/' },
      { name: 'whitespace', content: ' ' },
      { name: 'number', content: '4E-3' }
    ]);
  });

  // Test that we can parse the non-logical operators, i.e. +, -, <>, etc. but not AND, OR, etc.
  //
  // All the non-logical operators are parsed into "special" segments, although the converse isn't true,
  // because ",", ";", ":", and "." are also parsed as "special" segments.
  // The logical operators like AND and BETWEEN are parsed as "keyword" segments.
  //
  // In particular, this describe() block tests that:
  //
  // * All non-logical operators listed at https://www.w3schools.com/sql/sql_operators.asp etc. are recognized.
  // * Multi-character operators like >= are parsed as a single segment, even though > and = are both operators too.
  // * Minus and dot are treated as part of a number when they are next to a digit, ex: "x > -5" or even "x>-5".
  // * Minus is treated as a binary operator when there are spaces around it, ex: "x - 5".
  //
  // Conversely, it avoids testing strings like "x-5" because our regex-lexer architecture isn't
  // sophisticated enough to realize the minus must be a binary operator.
  describe('non-logical operators', () => {
    it('arithmetic', () => {
      expect(getSegments('a + 1 - -.2 * 34 /.56 % 7')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '+' },
        { name: 'whitespace', content: ' ' },
        { name: 'number', content: '1' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '-' },
        { name: 'whitespace', content: ' ' },
        { name: 'number', content: '-.2' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '*' },
        { name: 'whitespace', content: ' ' },
        { name: 'number', content: '34' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '/' },
        { name: 'number', content: '.56' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '%' },
        { name: 'whitespace', content: ' ' },
        { name: 'number', content: '7' }
      ]);
    });

    it('bitwise', () => {
      expect(getSegments('a & 8 | 9 ^b>>c<<d')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '&' },
        { name: 'whitespace', content: ' ' },
        { name: 'number', content: '8' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '|' },
        { name: 'whitespace', content: ' ' },
        { name: 'number', content: '9' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '^' },
        { name: 'identifier', content: 'b' },
        { name: 'special', content: '>>' },
        { name: 'identifier', content: 'c' },
        { name: 'special', content: '<<' },
        { name: 'identifier', content: 'd' }
      ]);
    });

    it('single character comparison', () => {
      expect(getSegments('a = b')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '=' },
        { name: 'whitespace', content: ' ' },
        { name: 'identifier', content: 'b' }
      ]);
      expect(getSegments('a > b')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '>' },
        { name: 'whitespace', content: ' ' },
        { name: 'identifier', content: 'b' }
      ]);
      expect(getSegments('a<b')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'special', content: '<' },
        { name: 'identifier', content: 'b' }
      ]);
    });

    it('multi character comparison', () => {
      expect(getSegments('a>=-5')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'special', content: '>=' },
        { name: 'number', content: '-5' }
      ]);
      expect(getSegments('a <= b')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'whitespace', content: ' ' },
        { name: 'special', content: '<=' },
        { name: 'whitespace', content: ' ' },
        { name: 'identifier', content: 'b' }
      ]);
      expect(getSegments('a!=.5')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'special', content: '!=' },
        { name: 'number', content: '.5' }
      ]);
      expect(getSegments('a!<b')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'special', content: '!<' },
        { name: 'identifier', content: 'b' }
      ]);
      expect(getSegments('a!>b')).toStrictEqual([
        { name: 'identifier', content: 'a' },
        { name: 'special', content: '!>' },
        { name: 'identifier', content: 'b' }
      ]);
    });

    it('compound operators', () => {
      expect(
        getSegments(
          'UPDATE STUDENTS SET MARKS+=10,A-=5,B*=6,C/=7,D%=8,E&=F,G^-=H,I|*=J WHERE MARKS<85;'
        )
      ).toStrictEqual([
        { name: 'keyword', content: 'UPDATE' },
        { name: 'whitespace', content: ' ' },
        { name: 'identifier', content: 'STUDENTS' },
        { name: 'whitespace', content: ' ' },
        { name: 'keyword', content: 'SET' },
        { name: 'whitespace', content: ' ' },
        { name: 'identifier', content: 'MARKS' },
        { name: 'special', content: '+=' },
        { name: 'number', content: '10' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'A' },
        { name: 'special', content: '-=' },
        { name: 'number', content: '5' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'B' },
        { name: 'special', content: '*=' },
        { name: 'number', content: '6' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'C' },
        { name: 'special', content: '/=' },
        { name: 'number', content: '7' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'D' },
        { name: 'special', content: '%=' },
        { name: 'number', content: '8' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'E' },
        { name: 'special', content: '&=' },
        { name: 'identifier', content: 'F' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'G' },
        { name: 'special', content: '^-=' },
        { name: 'identifier', content: 'H' },
        { name: 'special', content: ',' },
        { name: 'identifier', content: 'I' },
        { name: 'special', content: '|*=' },
        { name: 'identifier', content: 'J' },
        { name: 'whitespace', content: ' ' },
        { name: 'keyword', content: 'WHERE' },
        { name: 'whitespace', content: ' ' },
        { name: 'identifier', content: 'MARKS' },
        { name: 'special', content: '<' },
        { name: 'number', content: '85' },
        { name: 'special', content: ';' }
      ]);
    });
  });

  it('other special characters', () => {
    expect(getSegments('select foo.a, foo.b from foo;')).toStrictEqual([
      { name: 'keyword', content: 'select' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: 'foo' },
      { name: 'special', content: '.' },
      { name: 'identifier', content: 'a' },
      { name: 'special', content: ',' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: 'foo' },
      { name: 'special', content: '.' },
      { name: 'identifier', content: 'b' },
      { name: 'whitespace', content: ' ' },
      { name: 'keyword', content: 'from' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: 'foo' },
      { name: 'special', content: ';' }
    ]);
    expect(
      getSegments('INSERT INTO MyTable (ID) VALUES (:myId)')
    ).toStrictEqual([
      { name: 'keyword', content: 'INSERT INTO' },
      { name: 'whitespace', content: ' ' },
      { name: 'function', content: 'MyTable' },
      { name: 'whitespace', content: ' ' },
      { name: 'bracket', content: '(' },
      { name: 'identifier', content: 'ID' },
      { name: 'bracket', content: ')' },
      { name: 'whitespace', content: ' ' },
      { name: 'keyword', content: 'VALUES' },
      { name: 'whitespace', content: ' ' },
      { name: 'bracket', content: '(' },
      { name: 'special', content: ':' },
      { name: 'identifier', content: 'myId' },
      { name: 'bracket', content: ')' }
    ]);
  });

  it('complex query', () => {
    expect(
      getSegments(
        "SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `foo` = 'BAR' OR 1=1"
      )
    ).toStrictEqual([
      { name: 'keyword', content: 'SELECT' },
      { name: 'whitespace', content: ' ' },
      { name: 'function', content: 'COUNT' },
      { name: 'bracket', content: '(' },
      { name: 'identifier', content: 'id' },
      { name: 'bracket', content: ')' },
      { name: 'special', content: ',' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: '`id`' },
      { name: 'special', content: ',' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: '`username`' },
      { name: 'whitespace', content: ' ' },
      { name: 'keyword', content: 'FROM' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: '`users`' },
      { name: 'whitespace', content: ' ' },
      { name: 'keyword', content: 'WHERE' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: '`email`' },
      { name: 'whitespace', content: ' ' },
      { name: 'special', content: '=' },
      { name: 'whitespace', content: ' ' },
      { name: 'string', content: "'test@example.com'" },
      { name: 'whitespace', content: ' ' },
      { name: 'keyword', content: 'AND' },
      { name: 'whitespace', content: ' ' },
      { name: 'identifier', content: '`foo`' },
      { name: 'whitespace', content: ' ' },
      { name: 'special', content: '=' },
      { name: 'whitespace', content: ' ' },
      { name: 'string', content: "'BAR'" },
      { name: 'whitespace', content: ' ' },
      { name: 'keyword', content: 'OR' },
      { name: 'whitespace', content: ' ' },
      { name: 'number', content: '1' },
      { name: 'special', content: '=' },
      { name: 'number', content: '1' }
    ]);
  });
});

describe('custom escaper', () => {
  it('uses default escaper', () => {
    expect(highlight("'array<map<string,string>>'", { html: true })).toBe(
      '<span class="sql-hl-string">&#39;array&lt;map&lt;string,string&gt;&gt;&#39;</span>'
    );
  });

  it('works with dud escaper', () => {
    expect(
      highlight("'array<map<string,string>>'", {
        html: true,
        htmlEscaper: (s) => s
      })
    ).toBe('<span class="sql-hl-string">\'array<map<string,string>>\'</span>');
  });

  it('works with bad escaper', () => {
    expect(
      highlight("'array<map<string,string>>'", {
        html: true,
        htmlEscaper: () => 'foobar'
      })
    ).toBe('<span class="sql-hl-string">foobar</span>');
  });
});
