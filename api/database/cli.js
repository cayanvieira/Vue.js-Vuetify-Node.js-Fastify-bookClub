process.argv.splice(2, 0, '--cwd', 'database')

require('knex/bin/cli.js')
