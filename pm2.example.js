require('dotenv').config()

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: './build/main.js',
      instances: 0, // use maximum processes possible according to the numbers of CPUs for supporting cluster mode
      exec_mode: 'cluster', // see https://pm2.keymetrics.io/docs/usage/cluster-mode/
      watch: ['build'], // watch build directory which is changed when the typescript code is build
      autorestart: true, // auto restart this app when watched things are changed
      max_memory_restart: '2G',
      kill_timeout: process.env.APP_SHUTDOWN_TIMEOUT // set SIGKILL signal timeout for graceful shutdown
    }
  ]
}
