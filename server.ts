// https://github.com/kravetsone/elysia-react-router/blob/main/example/server/index.ts

import { Elysia } from "elysia"
import { reactRouter } from "elysia-react-router"

const port = Number(process.env.PORT) || 3000

new Elysia()
  .use(
    await reactRouter({
      // getLoadContext: () => ({ hotPostName: "some post title" }),
      // const context = new unstable_RouterContextProvider();
    })
  )

  .listen(port, () => {
    console.log(
      `Elysia server is running on ${process.env.NODE_ENV} mode at http://localhost:${port}`
    )
  })

process.on("SIGINT", () => {
  process.exit(0)
})

process.on("SIGTERM", () => {
  process.exit(0)
})

declare module "react-router" {
  interface AppLoadContext {
    hotPostName: string
  }
}
