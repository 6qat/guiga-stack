import type { unstable_MiddlewareFunction, unstable_RouterContextProvider } from "react-router"
import { unstable_createContext } from "react-router"

export type Guiga = { id: number }
export const helloContext = unstable_createContext<Guiga>()

// TODO: study the client version: unstableClientMiddlewareFunction
// https://sergiodxa.com/tutorials/use-middleware-in-react-router
export const helloMiddleware: unstable_MiddlewareFunction<Response> = async (
  { request, context },
  next
) => {
  context.set(helloContext, { id: 10 })
  const start = performance.now()

  // 👇 Grab the response here
  const res = await next()

  const duration = performance.now() - start
  console.log(`Navigated to ${request.url} (${duration}ms)`)

  // 👇 And return it here (optional if you don't modify the response)
  return res
}

export function getHello(context: unstable_RouterContextProvider) {
  return context.get(helloContext)
}
