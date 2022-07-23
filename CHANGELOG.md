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
