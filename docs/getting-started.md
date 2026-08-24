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

Import the published stylesheet once in your application entry point:

```tsx
import "veyra-ui/styles.css";
import { Button } from "veyra-ui";

function App() {
	return <Button>Click me</Button>;
}

export default App;
```

## Controlled state

Interactive components generally accept a `value` or `checked` prop and a matching change callback. Use controlled state when the application owns the value:

```tsx
const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onCheckedChange={setEnabled} />;
```

Use `defaultValue` or `defaultChecked` when an initial value is enough.

## TypeScript

Component prop types are exported alongside components:

```tsx
import { Button, type ButtonProps, type SelectOption } from "veyra-ui";
```

`Select` is built on `react-select`. Install it explicitly when your package manager does not automatically install peer dependencies:

```bash
npm install react-select
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

## Useful scripts

- `npm run dev` starts the Vite playground.
- `npm run build` type-checks declarations and creates the distributable bundle.
- `npm run lint` checks TypeScript and React source with ESLint.
