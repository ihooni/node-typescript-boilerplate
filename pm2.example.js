require('dotenv').config()

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: './build/src/main.js',
      instances: 0, // use maximum processes possible according to the numbers of CPUs for supporting cluster mode
      exec_mode: 'cluster', // see https://pm2.keymetrics.io/docs/usage/cluster-mode/
      watch: ['build'], // watch build directory which is changed when the typescript code is build
      autorestart: true, // auto restart this app when watched things are changed
      max_memory_restart: '2G'
    }
  ]
}