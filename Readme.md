Boilerplate project for playing with custom JSX transpilation.

# Dependecies
`Babel` used for jsx parsing and watching files changes. `Http-server` used for serving access via http.

# Architecture

## `src` folder
Put any `.jsx` files here. No modules system is used for simplicity of example, everithing just bunched in the global scope.

## `static` folder

### `index.html` file
Put names of resulting `.js` files in `<script>` tags, ordered respectivly to reversed dependecy graph of components.

### `jsxProcessing.js` file
Put here any JSX processing logic that you want. Also provide `jsxRenderer` object, that will be used for your top JSX-component.

# Setup

> npm i && npm start

# Credits

The code from [this repo](https://github.com/bitboxer/jsx-no-react) was used for creation of `jsxProcessing.js`.
