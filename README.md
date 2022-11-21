# Base BigCommerce Theme

This stencil theme uses a custom build config to do the following:
- Statically render React components as HTML template files
- Build project styles with TailwindCSS
- Build client-side bundle for island hydration & interactivity

This allows for a better DX (than native Stencil) by allowing for a componentized architecture and more modern tooling.
The current configuration uses PreactJS to allow for a familiar React-like interface, with very small client bundle sizes.

## Usage

React components are rendered into static HTML, which still requires the usage of Handlebars to control server rendering.
There are some helper functions within src/utils/template that make this easier.

### hb(value: string, raw?: boolean)

This function will render double-curly brackets around the value provided. If raw is true, triple-curly brackets are rendered for unescaped values.

### block(type: 'each' | 'if' | 'unless', check: string, Component: JSX.Element)

This function renders a Handlebars block section. The content within the block will be the statically rendered with the React component provided.

### template

This object contains many pre-built template values according to the data that Stencil provides.
The object has values for urls, products, customer and a few other items. It is a WIP.

## Widgets

Custom widgets can also be built and uploaded within this codebase.
The store hash must be placed within the secrets.stencil.json file under the key 'hash' in order for the CLI tool to work.
Check the src/widgets file for an example custom widget.
