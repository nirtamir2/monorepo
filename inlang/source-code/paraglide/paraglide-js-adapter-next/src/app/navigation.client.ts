import { createNavigation } from "./navigation.base"
import { getLanguage } from "./getLanguage.client"

export const { useRouter, redirect, permanentRedirect, usePathname } = createNavigation(getLanguage)
