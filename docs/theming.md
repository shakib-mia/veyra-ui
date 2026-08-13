# Theming & CSS

Veyra UI uses CSS variables and a small theme file located under `src/styles/theme.css` to control colors, spacing, and typography.

## Importing theme

Make sure to import the library styles (see Getting Started). You can override CSS variables in your application root:

```css
:root {
  --veyra-bg: 255 255 255;
  --veyra-fg: 17 24 39;
  --veyra-primary: 59 130 246;
}
```

## Customizing components

Most components rely on utility classes and CSS variables; override variables or add wrapping classes to adjust appearance.
