/**
 * This is by no means a real unit test or anything like
 * that. It's just to see that it's working in the console.
 */

const { highlight } = require('../lib')

console.log(highlight("SELECT COUNT(id), COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `something` = 'oke' AND 1=1"))
console.log(highlight('SELECT "users".* FROM "users"'))
console.log(highlight('select "users".* from "users" where ("username" = \'test\' or "email" = \'test\') and "is_admin" = true and "is_banned" = false limit 1'))

console.log(highlight("SELECT COUNT(id), COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `something` = 'oke-doke' AND true = true"))
console.log(highlight("SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND (username in ( SELECT \"name\" from aTable)", { html: false }))
console.log(highlight('SELECT id FROM users'))

console.log(highlight('WITH t1 AS (SELECT data_point FROM tablename) SELECT data_point FROM t1;'))
console.log(highlight('SELECT f1, f20b, f3a, -1, 1, "1", 1.00 FROM t1;'))

console.log(highlight('SELECT id FROM listings WHERE status = \'not available\''))
console.log(highlight('SELECT id FROM listings WHERE status = "not available"'))

console.log(highlight('SELECT \'{"json_index":"json_value"}\' AS test;'))
console.log(highlight('SELECT "This is a \\"text\\" test" AS text;'))
console.log(highlight('SELECT \'\\\r\t\n\' AS text;'))

console.log(highlight('DROP PROCEDURE IF EXISTS `some-database`.`some-table`;'))

console.log(highlight('SELECT * FROM a;SELECT * FROM b;'))

console.log(highlight('SELECT foo /* comment, not "keyword" WHERE GROUP */ FROM bar; -- comment\nSELECT * FROM baz;'))

console.log(highlight("select * from a where b = 'array<map<string,string>>';", { html: true }))
