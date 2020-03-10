import { Request, Response, NextFunction } from 'express'

/**
 * Declare types for http handler
 */

export type HttpRequest = Request
export type HttpResponse = Response
export type HttpNext = NextFunction

export type SimpleHandler = (req: HttpRequest, res: HttpResponse) => void
export type NextHandler = (
  req: HttpRequest,
  res: HttpResponse,
  next: HttpNext
) => void
export type ErrorHandler = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  next: HttpNext
) => void

export type HttpHandler = SimpleHandler | NextHandler | ErrorHandler
