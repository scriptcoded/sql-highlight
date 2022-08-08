# [4.1.0](https://github.com/scriptcoded/sql-highlight/compare/v4.0.5...v4.1.0) (2022-07-23)


### Features

* mixed case keyword matching ([#47](https://github.com/scriptcoded/sql-highlight/issues/47)) ([f848a14](https://github.com/scriptcoded/sql-highlight/commit/f848a140d43df140e77e003a0c6914b61560e708))

## [4.2.0](https://github.com/scriptcoded/sql-highlight/compare/v4.1.1...v4.2.0) (2022-08-08)


### Features

* **getSegments:** custom highlighter ([#57](https://github.com/scriptcoded/sql-highlight/issues/57)) ([8150d15](https://github.com/scriptcoded/sql-highlight/commit/8150d158d524e9b4999a8da04b2623cca38132ff))

## [4.1.1](https://github.com/scriptcoded/sql-highlight/compare/v4.1.0...v4.1.1) (2022-07-26)


### Bug Fixes

* nested quotes ([#40](https://github.com/scriptcoded/sql-highlight/issues/40)) ([b2c2a6c](https://github.com/scriptcoded/sql-highlight/commit/b2c2a6c4b1bf3370b3dd0da6af36838e4e08e644))
* number regex ([#41](https://github.com/scriptcoded/sql-highlight/issues/41)) ([a6d1fd6](https://github.com/scriptcoded/sql-highlight/commit/a6d1fd640e115583d9e69d82ef1fb429f5b3da1b))

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

# [4.0.0](https://github.com/scriptcoded/sql-highlight/compare/v3.3.5...v4.0.0) (2021-07-16)


### Bug Fixes

* update main file ([d19ee2e](https://github.com/scriptcoded/sql-highlight/commit/d19ee2efa671740dad8bf0369c8ead84ed82373f))


### Code Refactoring

* move sources to lib ([c4499a3](https://github.com/scriptcoded/sql-highlight/commit/c4499a34f12ea3383a172a15ae9beefcc1c73edb))


### BREAKING CHANGES

* moved sources

Sources have been moved to the `lib` folder. If you're referencing files
directly (`require(sql-highlight/index.js)`) you should instead
reference the new lib directory (`require(sql-highlight/lib/index.js)`)
