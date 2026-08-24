# Veyra UI

Veyra UI is a lightweight, themeable React component library for building consistent application interfaces with TypeScript.

## Documentation

Full documentation, component references, examples, and contribution guidance are available in the `docs/` folder. Start with:

- [docs/index.md](docs/index.md)

## Install

Install from npm:

```bash
npm install veyra-ui
```

Or with yarn:

```bash
yarn add veyra-ui
```

## Quick usage

Import the published stylesheet once in your app and use components:

```tsx
import "veyra-ui/styles.css";
import { Button } from "veyra-ui";

export default function App() {
	return <Button>Click me</Button>;
}
```

## Development

To develop locally:

```bash
npm install
npm run dev
```

Run the library build:

```bash
npm run build
```

## Contributing

See [docs/contributing.md](docs/contributing.md) for contribution guidelines, the development workflow, and testing tips.

## License

This project is available under the MIT License. See the `LICENSE` file for details.
