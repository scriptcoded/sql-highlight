/**
 * This is by no means a real unit test or anything like
 * that. It's just to see that it's working in the console.
 */

const Highlighter = require('../index')

const highlighter = new Highlighter({
  html: true
})

console.log(highlighter.highlight("SELECT `id`, `username` FROM `users` WHERE `email` = 'test@example.com'"))
