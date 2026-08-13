# Button

The `Button` component is a primary interactive element for actions.

## Import

```tsx
import { Button } from "veyra-ui";
```

## Basic usage

```tsx
<Button>Save</Button>
<Button variant="ghost">Cancel</Button>
<Button disabled>Disabled</Button>
```

## Props

- `children: React.ReactNode` — Button label
- `onClick?: () => void` — Click handler
- `disabled?: boolean` — Disabled state
- `variant?: 'default' | 'ghost' | 'outline' | 'link'` — Visual variant
- `size?: 'sm' | 'md' | 'lg'` — Size

## Notes

Use utility classes from the library for layout. See `src/components/button/button.variants.ts` for variants.
