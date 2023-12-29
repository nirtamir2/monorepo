import { setLanguageTag, isAvailableLanguageTag, sourceLanguageTag } from "./paraglide/runtime"

export function onRequest({ url }: { url: URL }, next: () => Response | Promise<Response>) {
	setLanguageTag(() => getLangFromPath(url.pathname))

	// return a Response or the result of calling `next()`
	return next()
}

function getLangFromPath(path: string) {
	const [lang] = path.split("/").filter(Boolean)
	if (isAvailableLanguageTag(lang)) return lang
	return sourceLanguageTag
}
