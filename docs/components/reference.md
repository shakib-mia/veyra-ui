# Component API Reference

This is the compact reference for the public exports from `veyra-ui`. All examples import from the package root.

```tsx
import { Button, Card, CardContent } from "veyra-ui";
```

Props that extend native HTML attributes accept the matching attributes plus `className`. All event callbacks are optional unless marked otherwise.

## Actions and feedback

### Button

`Button` supports `variant`, `size`, `loading`, `disabled`, `as`, and native button or element props. Variants are `primary`, `secondary`, `outline`, `ghost`, `link`, and `destructive`; sizes are `sm`, `md`, and `lg`.

```tsx
<Button variant="primary" size="md" loading>Saving</Button>
<Button as="a" href="/settings" variant="outline">Settings</Button>
```

`Badge` supports semantic visual variants for compact status labels. `Alert` accepts `variant` (`default`, `success`, `warning`, `destructive`) and content. `Avatar` accepts `src`, `alt`, `fallback`, and `size` (`sm`, `md`, `lg`, `xl`).

`Spinner` accepts `size` (`sm`, `md`, `lg`, `xl`). `Skeleton` accepts native div props and is sized with `className`. `EmptyState` accepts a title, description, optional icon, and action content.

## Layout and composition

### Card

Compose `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.

```tsx
<Card>
	<CardHeader>
		<CardTitle>Profile</CardTitle>
	</CardHeader>
	<CardContent>Account details</CardContent>
	<CardFooter>
		<Button>Save</Button>
	</CardFooter>
</Card>
```

`PageHeader` accepts `title`, optional `description`, and optional action content. `Separator` accepts native div props and an `orientation` of `horizontal` or `vertical`.

### Accordion

Compose `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent`. The root supports `type`, `value`, `defaultValue`, and `onValueChange` for single or multiple expansion. Items use a matching `value` and can be `disabled`.

### Tabs

Compose `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`. The root uses `value`, `defaultValue`, and `onValueChange`; each trigger and content uses a matching `value`.

## Overlays

### Dialog

`Dialog` is controlled with `open` and `onOpenChange`. Its children must be composed from `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, and `DialogFooter`.

```tsx
<Dialog open={open} onOpenChange={setOpen}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Invite member</DialogTitle>
			<DialogDescription>
				Choose who can access this workspace.
			</DialogDescription>
		</DialogHeader>
		<DialogBody>...</DialogBody>
		<DialogFooter>
			<Button onClick={() => setOpen(false)}>Done</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
```

`DialogContent` supports `showClose` (default `true`). Escape and backdrop clicks call `onOpenChange(false)`.

`ConfirmDialog` and `FormDialog` provide common dialog workflows. See [Confirm Dialog](confirm-dialog.md) and [Form Dialog](form-dialog.md).

### Popover and menus

Compose `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, and `PopoverDescription`. The root uses `open`, `defaultOpen`, and `onOpenChange`.

Compose `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuLabel`, `DropdownMenuItem`, and `DropdownMenuSeparator`. Items support `onSelect` and `disabled`.

`Tooltip` accepts `content`, `children`, and optional `side`; wrap the element that needs a hover or focus explanation.

## Form controls

`Label` accepts native label props and `variant`. `FormField` groups a label, control, help text, and error state; use its `label`, `error`, `description`, and `required` props with children.

`Input` and `Textarea` accept native input or textarea attributes plus `variant` and `size`. `Checkbox` and `Switch` use `checked`, `defaultChecked`, `onCheckedChange`, and `disabled`.

`Radio` uses `value`, `checked`, `defaultChecked`, `onChange`, and `disabled`. `RadioGroup` uses `name`, `value`, `defaultValue`, `onValueChange`, and `disabled`; use `RadioGroupItem` with `value`, `label`, and optional `description`.

`Select` accepts `options: SelectOption[]`, where each option is `{ label, value, disabled? }`. It supports `value`, `defaultValue`, `onChange`, `placeholder`, `isDisabled`, `isClearable`, `isSearchable`, `isOptionDisabled`, and `isCreatable` with `onCreateOption`. `size` is `sm`, `md`, or `lg`.

## Dates, files, and data

`DatePicker` uses `value: Date | undefined`, `onChange`, `placeholder`, `disabled`, `minDate`, and `maxDate`. `DateRangePicker` uses `value: DateRange | undefined` and the same surrounding props.

`FileUpload` uses `value: File[]`, `onChange`, `multiple`, `maxFiles`, `accept`, `title`, and `description`. `FileThumbnail` renders a preview for a file.

`FilterChips` accepts `chips`, `value`, and `onChange` for a compact multi-filter control.

`Pagination` accepts `page`, `pageSize`, `total`, and `onPageChange` plus page-size configuration. `DataTable<T>` accepts `data`, `columns`, optional filters/search/pagination, and alignment settings. A column can provide `accessor` or a custom `render` function. Lower-level `Table`, `TableFilters`, `TableSearch`, and `TablePagination` are also exported.

## Navigation

`Breadcrumb` accepts `items: BreadcrumbItem[]`, where an item contains a `label` and optional `href`. Use `Tabs`, `PageHeader`, and `Separator` to build page-level navigation and structure.

## `cn`

`cn(...inputs)` merges conditional class names with Tailwind-aware conflict resolution:

```tsx
import { cn } from "veyra-ui";

const classes = cn("px-3", active && "text-primary", className);
```

For exact generic signatures and uncommon props, use the exported TypeScript declarations generated by `npm run build`.
