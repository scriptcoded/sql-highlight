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
