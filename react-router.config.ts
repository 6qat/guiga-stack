import type { Config } from "@react-router/dev/config"
import "react-router"

declare module "react-router" {
  interface Future {
    unstable_middleware: true // 👈 Enable middleware types
  }
}

export default {
  ssr: true,
  future: {
    unstable_middleware: true, // 👈 Enable middleware
    unstable_splitRouteModules: true,
    unstable_optimizeDeps: true,
  },
} satisfies Config
