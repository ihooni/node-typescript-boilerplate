import dotenv from 'dotenv'
import RouteServiceProvider from '@/providers/RouteServiceProvider'
import http from 'http'
import { createTerminus } from '@godaddy/terminus'
import MongoConnector from '@/modules/database/MongoConnector'
import Logger from '@/modules/log/Logger'

/**
 * For kubernetes readiness / liveness checks.
 *
 * TODO: make your own health check function like checking the database connection
 */
function onHealthCheck(): Promise<void> {
  return Promise.resolve()
}

/**
 * This function is called when shutdown signal is received.
 * Clean up all of things for graceful shutdown.
 *
 * TODO: make your own clean up function like closing the database connection
 */
function onSignal(): Promise<void> {
  return Promise.resolve()
}

/**
 * Start the application.
 * This is the main function.
 */
async function bootApp(): Promise<void> {
  let app

  // boot the services
  try {
    await MongoConnector.I.connect()
    app = RouteServiceProvider.boot()
  } catch (error) {
    // log the booting error and exit this app
    Logger.I.log('debug', `App booting error: ${error}`)
    process.exit(1)
  }

  const server = http.createServer(app)

  // configure health checking and graceful shutdown
  createTerminus(server, {
    healthChecks: {
      '/healthcheck': onHealthCheck
    },
    timeout:
      process.env.APP_ENV === 'production'
        ? parseInt(process.env.APP_SHUTDOWN_TIMEOUT, 10)
        : 1, // shutdown right after receiving signal when app env is not production
    signals: ['SIGINT', 'SIGTERM'],
    onSignal
  })

  // open server
  server.listen(process.env.APP_PORT)
}

dotenv.config() // load env values
bootApp().then()
