require('dotenv/config')
const exec = require('child_process').exec
const cmd = `http-server -p ${ process.env.FILESERVER_PORT } -c -1 --cors`

exec(cmd, (error, stdout, stderr) => {
  if(error) throw error
})
