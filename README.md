# Veyra UI

Veyra UI is a lightweight React component library built with TypeScript and Vite. It provides accessible, themeable components and utilities for building consistent UIs.

## Documentation

Full documentation (guides, component references, examples) is available in the `docs/` folder of this repository. Start with:

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

Import global styles once in your app (for example in `src/main.tsx`) and use components:

```tsx
import "veyra-ui/styles/index.css";
import React from "react";
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
