import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("doc-pricing")
export class DocPricing extends LitElement {
	static override styles = css`
		.doc-dev-tool {
			background-color: #ffffff;
			padding: 1rem 2rem;
			border-radius: 1rem;
			border: 1px solid #e2e8f0;
		}
		.doc-h2 {
		}
		.doc-p {
			color: #475569;
			line-height: 1.6rem;
		}
	`

	@property()
	heading: string = "Future enterprise features might cost money"

	@property()
	content: string = `But, we have little incentive to monetize individual or small scale usage. We see individual usage as marketing. Users who love this app will recommend it to their employers/companies that we can monetize with enterprise features.`

	override render() {
		return html`<div class="doc-dev-tool">
			<h2 class="doc-h2">${this.heading}</h2>
			<p class="doc-p">${this.content}</p>
		</div> `
	}
}
