# Dialog

Controlled modal built from composable dialog sections. See the [complete Dialog reference](reference.md#dialog).

```tsx
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogBody,
	DialogFooter,
	Button,
} from "veyra-ui";

<Dialog open={open} onOpenChange={setOpen}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Dialog</DialogTitle>
		</DialogHeader>
		<DialogBody>Content</DialogBody>
		<DialogFooter>
			<Button onClick={() => setOpen(false)}>Done</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>;
```

`DialogContent` supports `showClose`. Escape and backdrop clicks close the dialog through `onOpenChange(false)`.
