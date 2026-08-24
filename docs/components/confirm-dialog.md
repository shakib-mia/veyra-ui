# Confirm Dialog

`ConfirmDialog` is a ready-made destructive-action confirmation flow built on `Dialog`.

```tsx
import { ConfirmDialog } from "veyra-ui";

const [open, setOpen] = useState(false);

<ConfirmDialog
	open={open}
	onOpenChange={setOpen}
	title="Delete customer?"
	description="This action cannot be undone."
	confirmText="Delete"
	confirmVariant="destructive"
	onConfirm={async () => removeCustomer()}
/>;
```

## Props

- `open: boolean` and `onOpenChange(open: boolean)`: controlled visibility.
- `title?: string`: defaults to `Are you sure?`.
- `description?: string`: defaults to `This action cannot be undone.`; pass an empty string to hide it.
- `message?: ReactNode`: optional rich content rendered in the body.
- `cancelText?: string` and `confirmText?: string`: button labels.
- `confirmVariant?: ButtonProps["variant"]`: confirm button style.
- `loading?: boolean`: disables cancellation and shows the confirm button loader.
- `onConfirm: () => void | Promise<void>`: action invoked by the confirm button.

Keep `loading` true until the asynchronous action settles, then close the dialog through `onOpenChange(false)`.
