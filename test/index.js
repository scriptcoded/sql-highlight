/**
 * This is by no means a real unit test or anything like
 * that. It's just to see that it's working in the console.
 */

const { highlight } = require('../index')

console.log(highlight("SELECT COUNT(id), COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `something` = 'oke' AND 1=1"))
console.log(highlight('SELECT "users".* FROM "users"'))
console.log(highlight('select "users".* from "users" where ("username" = \'test\' or "email" = \'test\') and "is_admin" = true and "is_banned" = false limit 1'))

console.log(highlight("SELECT COUNT(id), COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND `something` = 'oke-doke' AND true = true"))
console.log(highlight("SELECT COUNT(id), `id`, `username` FROM `users` WHERE `email` = 'test@example.com' AND (username in ( SELECT \"name\" from aTable)", { html: false }))
console.log(highlight("SELECT id FROM users"))
