# Getting Started

## Install

Install from npm:

```bash
npm install veyra-ui
```

Or with yarn:

```bash
yarn add veyra-ui
```

## Usage

Import global styles once in your app (e.g., in `src/main.tsx`):

```tsx
import "veyra-ui/styles/index.css";
import React from "react";
import { Button } from "veyra-ui";

function App() {
	return <Button>Click me</Button>;
}

export default App;
```

## Development

To run the component library locally while developing, use the existing Vite setup in the repository. From the project root:

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
```
