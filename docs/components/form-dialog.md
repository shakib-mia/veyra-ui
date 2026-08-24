# Form Dialog

`FormDialog` combines a controlled dialog with a native form and submit footer.

```tsx
import { FormDialog, Input, Label } from "veyra-ui";

<FormDialog
	open={open}
	onOpenChange={setOpen}
	title="Create customer"
	onSubmit={saveCustomer}
	loading={saving}
>
	<Label htmlFor="name">Name</Label>
	<Input id="name" name="name" required />
</FormDialog>;
```

Use `showFooter={false}` for a custom footer, `showClose={false}` to hide the close icon, and `disabled` to prevent submission. `loading` prevents closing while the form is submitting.
