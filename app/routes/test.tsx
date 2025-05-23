import type { Route } from "./+types/test";
import { getLocale, getInstance } from "~/middleware/i18next";
import { getHello } from "~/middleware/hello";
import { LanguageSwitcher } from "~/components/language-switcher";

export async function loader({ context }: Route.LoaderArgs) {
  console.log(getHello(context), " from server");
  const locale = getLocale(context);
  const date = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const i18next = getInstance(context);
  return {
    date,
    title: i18next.t("title"),
    description: i18next.t("description"),
  };
}

export async function clientLoader({
  context,
  serverLoader,
}: Route.ClientLoaderArgs) {
  console.log(getHello(context), " from client");
  const serverData = await serverLoader();
  return { ...serverData, fromServer: true };
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const; // `as const` for type inference

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Test({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Teste</h1>
      <div>
        <h1>{loaderData.title}</h1>
        <p>{loaderData.description}</p>
        <p>{loaderData.date}</p>
        <p>{JSON.stringify(loaderData, null, 2)}</p>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
