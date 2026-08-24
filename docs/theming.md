# Theming & CSS

Veyra UI uses CSS custom properties for colors, typography, spacing, radii, shadows, and motion. Import the package stylesheet before your application overrides so your variables win through normal cascade order.

## Importing styles

Make sure to import the library styles (see Getting Started). You can override CSS variables in your application root:

```css
import "veyra-ui/styles.css";
```

The source stylesheet is organized under `src/lib/styles/` in this repository. Published consumers should use `veyra-ui/styles.css`.

## Customizing components

Most components consume semantic variables such as `--color-background`, `--color-foreground`, `--color-primary`, `--color-border`, and `--color-ring`. Override them on `:root` or on a scoped wrapper:

```css
:root {
	--color-primary: #1769e0;
	--color-primary-foreground: #ffffff;
	--color-ring: #1769e0;
}

[data-theme="dark"] {
	--color-background: #111827;
	--color-foreground: #f9fafb;
	--color-card: #1f2937;
	--color-border: #374151;
}
```

Apply the theme attribute at the application root:

```tsx
<div data-theme={darkMode ? "dark" : "light"}>{children}</div>
```

## Styling individual components

Components that render a visual container accept `className` where their props extend native HTML attributes. Use `className` for local layout and tokens for system-wide changes. The `cn` helper is also exported for merging conditional class names.

```tsx
import { Button, cn } from "veyra-ui";

<Button className={cn("w-full", isCompact && "h-8")}>Continue</Button>;
```
