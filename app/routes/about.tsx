import type { Route } from "./+types/about"
import { getLocale, getInstance } from "~/middleware/i18next"
import { getHello } from "~/middleware/hello"

export async function loader({ context }: Route.LoaderArgs) {
  // console.log(getHello(context))
  const locale = getLocale(context)
  const date = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const i18next = getInstance(context)
  return { date, title: i18next.t("title"), description: i18next.t("description") }
}

export async function clientLoader({ context, serverLoader }: Route.ClientLoaderArgs) {
  console.log(getHello(context))
  const serverData = await serverLoader()
  return { ...serverData, fromServer: true }
}

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.description}</p>
      <p>{loaderData.date}</p>
      <p>{JSON.stringify(loaderData, null, 2)}</p>
    </div>
  )
}
