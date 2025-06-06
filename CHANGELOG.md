# [6.1.0](https://github.com/scriptcoded/sql-highlight/compare/v6.0.0...v6.1.0) (2025-06-06)


### Features

* added declare for procedual plsql as keyword ([812dfec](https://github.com/scriptcoded/sql-highlight/commit/812dfeca365f423450de09a1051295d0dd7edc4b))

# [6.0.0](https://github.com/scriptcoded/sql-highlight/compare/v5.0.0...v6.0.0) (2024-07-02)


### Bug Fixes

* improve number detection ([02d459a](https://github.com/scriptcoded/sql-highlight/commit/02d459abe51ec9714fe174a7b5fe07661b6e7dae)), closes [#149](https://github.com/scriptcoded/sql-highlight/issues/149)
* improve operator detection ([183a4fb](https://github.com/scriptcoded/sql-highlight/commit/183a4fb05692a61c6d2251c6c50f076ef58e5ae5)), closes [#150](https://github.com/scriptcoded/sql-highlight/issues/150)
* typo in unknown segments ([70af287](https://github.com/scriptcoded/sql-highlight/commit/70af287d5e6cd1f6880942349498a0a37e0e08a9)), closes [#148](https://github.com/scriptcoded/sql-highlight/issues/148) [#178](https://github.com/scriptcoded/sql-highlight/issues/178) [#148](https://github.com/scriptcoded/sql-highlight/issues/148)


### Features

* add way to style identifiers ([25677d4](https://github.com/scriptcoded/sql-highlight/commit/25677d40097ff9e623fc91e13c033d86d4ba47a2)), closes [#147](https://github.com/scriptcoded/sql-highlight/issues/147)
* release 5.1.0 ([3a58def](https://github.com/scriptcoded/sql-highlight/commit/3a58def5bfd4fc3c909470e61481546b46fdebc1))


### BREAKING CHANGES

* The `default` segment has been split into `identifier` and `whitespace`
segments.  There's also a new `unknown` segment that will only show up for malformed
SQL such as an unclosed string.

However, the highlight() function works largely the same as before, both normal mode and HTML mode,
except for the bug fix to stop classifying identifiers as strings.  In other words, SQL like

select * from EMP where NAME="John Smith"

will get highlighted the same as before, i.e. no syntax highlighting for EMP or NAME.

# [5.0.0](https://github.com/scriptcoded/sql-highlight/compare/v4.4.2...v5.0.0) (2024-07-02)


* chore!: add support for Node 22 ([9478bf1](https://github.com/scriptcoded/sql-highlight/commit/9478bf1485442c382b6f71719866c3cad4aa2f6b))


### Bug Fixes

* improve number detection ([02d459a](https://github.com/scriptcoded/sql-highlight/commit/02d459abe51ec9714fe174a7b5fe07661b6e7dae)), closes [#149](https://github.com/scriptcoded/sql-highlight/issues/149)
* improve operator detection ([183a4fb](https://github.com/scriptcoded/sql-highlight/commit/183a4fb05692a61c6d2251c6c50f076ef58e5ae5)), closes [#150](https://github.com/scriptcoded/sql-highlight/issues/150)
* typo in unknown segments ([70af287](https://github.com/scriptcoded/sql-highlight/commit/70af287d5e6cd1f6880942349498a0a37e0e08a9)), closes [#148](https://github.com/scriptcoded/sql-highlight/issues/148) [#178](https://github.com/scriptcoded/sql-highlight/issues/178) [#148](https://github.com/scriptcoded/sql-highlight/issues/148)


### Features

* add way to style identifiers ([25677d4](https://github.com/scriptcoded/sql-highlight/commit/25677d40097ff9e623fc91e13c033d86d4ba47a2)), closes [#147](https://github.com/scriptcoded/sql-highlight/issues/147)


### BREAKING CHANGES

* The `default` segment has been split into `identifier` and `whitespace`
segments.  There's also a new `unknown` segment that will only show up for malformed
SQL such as an unclosed string.

However, the highlight() function works largely the same as before, both normal mode and HTML mode,
except for the bug fix to stop classifying identifiers as strings.  In other words, SQL like

select * from EMP where NAME="John Smith"

will get highlighted the same as before, i.e. no syntax highlighting for EMP or NAME.
* drop support for Node 14.

# [5.0.0](https://github.com/scriptcoded/sql-highlight/compare/v4.4.2...v5.0.0) (2024-06-23)


* chore!: add support for Node 22 ([628360f](https://github.com/scriptcoded/sql-highlight/commit/628360f76ded8ae61c9ae2b0f7552eafbe8fb432))


### BREAKING CHANGES

* drop support for Node 14.

## [4.4.2](https://github.com/scriptcoded/sql-highlight/compare/v4.4.1...v4.4.2) (2024-03-10)


### Bug Fixes

* add COMMIT keyword ([b9ccf62](https://github.com/scriptcoded/sql-highlight/commit/b9ccf622c7d486fc950ed34e7a9f2ad6551d6f6a))

## [4.4.1](https://github.com/scriptcoded/sql-highlight/compare/v4.4.0...v4.4.1) (2024-03-10)


### Bug Fixes

* add RETURNING keyword ([e36fb72](https://github.com/scriptcoded/sql-highlight/commit/e36fb727c207671d6f3b4f7781637a663e5a63a4))

## [4.3.2](https://github.com/scriptcoded/sql-highlight/compare/v4.3.1...v4.3.2) (2023-03-16)

### Bug Fixes

* change number regex to not use lookbehind ([#106](https://github.com/scriptcoded/sql-highlight/issues/106)) ([8e52120](https://github.com/scriptcoded/sql-highlight/commit/8e52120ba976ef64e3d5dd5bb8ba0c800e30a989))

## [4.4.0](https://github.com/scriptcoded/sql-highlight/compare/v4.3.3...v4.4.0) (2023-10-04)


### Features

* SQL comments support ([9dad7b2](https://github.com/scriptcoded/sql-highlight/commit/9dad7b2bf9bcd7a6a1beee31e14ae41bbb23a7b4)), closes [#133](https://github.com/scriptcoded/sql-highlight/issues/133)


### Performance Improvements

* improved tokenizer ([1472619](https://github.com/scriptcoded/sql-highlight/commit/147261929f0817a09d679e4fe5a0fe1d2bb04c61)), closes [#133](https://github.com/scriptcoded/sql-highlight/issues/133)

## [4.3.3](https://github.com/scriptcoded/sql-highlight/compare/v4.3.2...v4.3.3) (2023-04-14)


### Bug Fixes

* add ILIKE keyword ([#111](https://github.com/scriptcoded/sql-highlight/issues/111)) ([a7a54f9](https://github.com/scriptcoded/sql-highlight/commit/a7a54f9499cbb7a13425dc057f729fb94d4a95c9))

## [4.3.1](https://github.com/scriptcoded/sql-highlight/compare/v4.3.0...v4.3.1) (2023-02-16)


### Miscellaneous Chores

* release 4.3.1 ([a66db9e](https://github.com/scriptcoded/sql-highlight/commit/a66db9e149f770cbf14b003de201465c8a0e8adf))

## [4.3.0](https://github.com/scriptcoded/sql-highlight/compare/v4.2.2...v4.3.0) (2023-01-13)


### Features

* escape HTML entities ([672fc9c](https://github.com/scriptcoded/sql-highlight/commit/672fc9cd8d4bd1595b403fbca70eca9a3e2020ef)), closes [#90](https://github.com/scriptcoded/sql-highlight/issues/90)

## [4.2.2](https://github.com/scriptcoded/sql-highlight/compare/v4.2.1...v4.2.2) (2022-12-22)


### Bug Fixes

* update dependencies ([50faad3](https://github.com/scriptcoded/sql-highlight/commit/50faad3256b94e75d696cd09a539dd7dc1c665a8))

## [4.2.1](https://github.com/scriptcoded/sql-highlight/compare/v4.2.0...v4.2.1) (2022-08-16)


### Bug Fixes

* don't break on nested segments ([#62](https://github.com/scriptcoded/sql-highlight/issues/62)) ([997ee9d](https://github.com/scriptcoded/sql-highlight/commit/997ee9deb9d25f48ce2b20c78c13ea22798fe8c4))

## [4.2.0](https://github.com/scriptcoded/sql-highlight/compare/v4.1.1...v4.2.0) (2022-08-08)


### Features

* **getSegments:** custom highlighter ([#57](https://github.com/scriptcoded/sql-highlight/issues/57)) ([8150d15](https://github.com/scriptcoded/sql-highlight/commit/8150d158d524e9b4999a8da04b2623cca38132ff))

## [4.1.1](https://github.com/scriptcoded/sql-highlight/compare/v4.1.0...v4.1.1) (2022-07-26)


### Bug Fixes

* nested quotes ([#40](https://github.com/scriptcoded/sql-highlight/issues/40)) ([b2c2a6c](https://github.com/scriptcoded/sql-highlight/commit/b2c2a6c4b1bf3370b3dd0da6af36838e4e08e644))
* number regex ([#41](https://github.com/scriptcoded/sql-highlight/issues/41)) ([a6d1fd6](https://github.com/scriptcoded/sql-highlight/commit/a6d1fd640e115583d9e69d82ef1fb429f5b3da1b))

## [4.1.0](https://github.com/scriptcoded/sql-highlight/compare/v4.0.5...v4.1.0) (2022-07-23)


### Features

* mixed case keyword matching ([#47](https://github.com/scriptcoded/sql-highlight/issues/47)) ([f848a14](https://github.com/scriptcoded/sql-highlight/commit/f848a140d43df140e77e003a0c6914b61560e708))

## [4.0.5](https://github.com/scriptcoded/sql-highlight/compare/v4.0.4...v4.0.5) (2022-07-23)


### Bug Fixes

* add missing keywords ([4834354](https://github.com/scriptcoded/sql-highlight/commit/483435477653dcc355f79d6bc24401d5151fa0c0)), closes [#37](https://github.com/scriptcoded/sql-highlight/issues/37)

## [4.0.4](https://github.com/scriptcoded/sql-highlight/compare/v4.0.3...v4.0.4) (2022-07-23)


### Bug Fixes

* revert keyword typo ([b887c52](https://github.com/scriptcoded/sql-highlight/commit/b887c52cae1571ef71ef5ab79c0607d339b4391d)), closes [#36](https://github.com/scriptcoded/sql-highlight/issues/36)

## [4.0.3](https://github.com/scriptcoded/sql-highlight/compare/v4.0.2...v4.0.3) (2022-07-23)


### Bug Fixes

* add IFNULL keyword ([0fb413a](https://github.com/scriptcoded/sql-highlight/commit/0fb413a21547c9b033e66613dc15c53446ca5591)), closes [#39](https://github.com/scriptcoded/sql-highlight/issues/39)

## [4.0.2](https://github.com/scriptcoded/sql-highlight/compare/v4.0.1...v4.0.2) (2022-07-23)


### Bug Fixes

* add missing keywords ([cfaca34](https://github.com/scriptcoded/sql-highlight/commit/cfaca34d46bb894e6b4968dae8bfae84be391b22))

## [4.0.1](https://github.com/scriptcoded/sql-highlight/compare/v4.0.0...v4.0.1) (2021-08-21)


### Bug Fixes

* add overlaps keyword ([29321dd](https://github.com/scriptcoded/sql-highlight/commit/29321ddcb55fb9e9859c07887bc1d81567ba1181))

## [4.0.0](https://github.com/scriptcoded/sql-highlight/compare/v3.3.5...v4.0.0) (2021-07-16)


### Bug Fixes

* update main file ([d19ee2e](https://github.com/scriptcoded/sql-highlight/commit/d19ee2efa671740dad8bf0369c8ead84ed82373f))


### Code Refactoring

* move sources to lib ([c4499a3](https://github.com/scriptcoded/sql-highlight/commit/c4499a34f12ea3383a172a15ae9beefcc1c73edb))


### BREAKING CHANGES

* moved sources

Sources have been moved to the `lib` folder. If you're referencing files
directly (`require(sql-highlight/index.js)`) you should instead
reference the new lib directory (`require(sql-highlight/lib/index.js)`)
