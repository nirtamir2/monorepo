import IconSearch from "~icons/material-symbols/search-rounded"
import { currentPageContext } from "#src/renderer/state.js"
import { createSignal } from "solid-js"
import { navigate } from "vike/client/router"
import * as m from "@inlang/paraglide-js/website/messages"

// Make search input available to other components so it can get cleared
export const [searchInput, setSearchInput] = createSignal<string>("")

export default function SearchBar() {
	let inputElement: any
	const { q } = currentPageContext.urlParsed.search
	const isMac = () => typeof window !== "undefined" && navigator.userAgent.includes("Mac")

	const handleNavigate = () => {
		if (!currentPageContext.routeParams.category) {
			if (searchInput() !== "") window.history.pushState({}, "", "/search?q=" + searchInput())
			// @ts-ignore
			if (searchInput() === "") navigate("/search")
			// @ts-ignore
			else navigate("/search?q=" + searchInput())
		} else {
			if (searchInput() !== "")
				window.history.pushState(
					{},
					"",
					"/c/" + currentPageContext.routeParams.category + "?q=" + searchInput()
				) // @ts-ignore
			if (searchInput() === "") navigate("/c/" + currentPageContext.routeParams.category)
			// @ts-ignore
			else navigate("/c/" + currentPageContext.routeParams.category + "?q=" + searchInput())
		}
	}

	if (typeof window !== "undefined")
		window.addEventListener("keydown", (e) => {
			if (e.metaKey && e.key === "k" && isMac()) {
				e.preventDefault()
				inputElement.focus()
			} else if (e.ctrlKey && e.key === "k" && !isMac()) {
				e.preventDefault()
				inputElement.focus()
			}
		})

	return (
		<form
			class="group relative flex justify-center gap-1 px-3 items-center border h-8 w-full py-0.5 rounded-full transition-all duration-150 bg-background border-surface-200 focus-within:border-primary"
			onSubmit={(e) => {
				e.preventDefault()
				handleNavigate()
			}}
		>
			<input
				type="text"
				aria-label="search input"
				id="search"
				name="search"
				autocomplete="off"
				placeholder={
					isMac()
						? m.marketplace_header_search_placeholder()
						: typeof window !== "undefined"
						? "Search"
						: ""
				}
				class="border-0 focus:ring-0 h-full w-full pl-0 text-sm md:placeholder:text-surface-400 placeholder:text-surface-900/0 transition-all"
				value={q ? q : searchInput()}
				ref={inputElement}
				onInput={(e) => {
					setSearchInput(e.target.value)
				}}
			/>
			<button type="submit" aria-label="submit search">
				<IconSearch class="ml-1.5 transition-color duration-150 group-focus-within:text-primary" />
			</button>
		</form>
	)
}
