import { useState } from "react";
import { Badge } from "./components/badge";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";
import { Select, type SelectOption } from "./components/select/select";
import { Textarea } from "./components/textarea";
import { Checkbox } from "./components/checkbox/checkbox";
import { Radio } from "./components/radio/radio";
import { Switch } from "./components/switch/switch";
import { Label } from "./components/label/label";
import {
	RadioGroup,
	RadioGroupItem,
} from "./components/radio-group/radio-group";
import { FormField } from "./components/form-field/form-field";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/card/card";
import { Separator } from "./components/separator/separator";
import { Alert } from "./components/alert/alert";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./components/dropdown-menu/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Tooltip } from "./components/tooltip/tooltip";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "./components/popover/popover";

function App() {
	const options: SelectOption[] = [
		{
			label: "Active",
			value: "ACTIVE",
		},
		{
			label: "Inactive",
			value: "INACTIVE",
		},
	];
	const [status, setStatus] = useState("ACTIVE");
	const [accepted, setAccepted] = useState(false);
	const [enabled, setEnabled] = useState(false);

	console.log(accepted);

	return (
		<main className="min-h-screen bg-background p-8">
			<div className="mx-auto max-w-5xl space-y-8">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold tracking-tight">
						Veyra UI
					</h1>

					<p className=" text-sm text-muted-foreground">
						React component library and design system.
					</p>
				</div>

				<div className="flex flex-wrap gap-3">
					<Button>Save</Button>

					<Button variant="secondary">Cancel</Button>

					<Button variant="destructive">Delete</Button>

					<Button variant="outline">Edit</Button>

					<Button variant="outline-destructive">Delete</Button>

					<Button variant="ghost">More</Button>

					<Button as="a" href="#" variant="link">
						Link
					</Button>
				</div>

				<div className="flex flex-wrap gap-3 items-center ">
					<Badge>Default</Badge>

					<Badge variant="primary">Active</Badge>

					<Badge variant="success">Completed</Badge>

					<Badge variant="warning">Pending</Badge>

					<Badge variant="danger">Cancelled</Badge>

					<Badge variant="info">Processing</Badge>

					<Badge variant="outline">Draft</Badge>
				</div>

				<div className="grid grid-cols-4 gap-3 items-center ">
					<Input size="sm" placeholder="sm size" />
					<Input size="md" placeholder="md size" />
					<Input size="lg" placeholder="lg size" />
					<Input
						type="email"
						name="email"
						placeholder="Enter email"
						// disabled
						required
						autoComplete="email"
					/>
				</div>
				<div className="grid grid-cols-4 gap-3 items-center ">
					<Textarea className="resize-none" size="sm" />

					<Textarea className="resize-none" size="md" />

					<Textarea className="resize-none" size="lg" />
				</div>

				<Select
					options={options}
					value={status}
					onChange={(e) => setStatus(e)}
				/>

				<div className="flex gap-3">
					<Checkbox label="Remember me" />

					<Checkbox label="Accept terms" defaultChecked />

					<Checkbox label="Disabled" disabled />

					<Checkbox
						label="Indeterminate"
						indeterminate
						defaultChecked
					/>

					<Checkbox
						name="terms"
						label="I agree to the terms"
						checked={accepted}
						onChange={(event) => setAccepted(event.target.checked)}
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Radio
						name="status"
						value="active"
						label="Active"
						defaultChecked
					/>

					<Radio name="status" value="inactive" label="Inactive" />

					<Radio
						name="status"
						value="disabled"
						label="Disabled"
						disabled
					/>
				</div>
				<Switch
					label="Active"
					checked={enabled}
					onChange={(event) => setEnabled(event.target.checked)}
				/>

				<div className="space-y-2">
					<Label htmlFor="email" required>
						Email Address
					</Label>

					<Input id="email" type="email" placeholder="Enter email" />
				</div>

				<div className="max-w-5xl space-y-8">
					<div>
						<h2 className="text-lg font-semibold">Status</h2>

						<p className="mt-1 text-sm text-muted-foreground">
							Select the current status.
						</p>
					</div>

					<RadioGroup
						value={status}
						onValueChange={setStatus}
						name="status"
					>
						<RadioGroupItem
							value="active"
							label="Active"
							description="The item is currently active."
						/>

						<RadioGroupItem
							value="inactive"
							label="Inactive"
							description="The item is currently inactive."
						/>

						<RadioGroupItem
							value="archived"
							label="Archived"
							description="This item is no longer active."
						/>

						<RadioGroupItem
							value="disabled"
							label="Disabled option"
							description="This option cannot be selected."
							disabled
						/>
					</RadioGroup>

					<div className="rounded-lg border border-border bg-card p-4">
						<p className="text-sm text-muted-foreground">
							Selected value
						</p>

						<p className="mt-1 font-medium">{status}</p>
					</div>
				</div>

				<div>
					<RadioGroup defaultValue="active">
						<RadioGroupItem value="active" label="Active" />
						<RadioGroupItem value="inactive" label="Inactive" />
					</RadioGroup>
				</div>

				<div>
					<FormField
						label="Username"
						htmlFor="username"
						required
						error="Please enter a valid username."
					>
						<Input id="username" type="username" />
					</FormField>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Account Information</CardTitle>

							<CardDescription>
								Update your account information.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<p className="text-sm">
								Your account details go here.
							</p>
						</CardContent>

						<CardFooter>
							<Button variant="secondary">Cancel</Button>

							<Button>Save Changes</Button>
						</CardFooter>
					</Card>
				</div>

				<div className="flex gap-4">
					<div className="space-y-4">
						<p>Customer Information</p>

						<Separator />

						<p>Vehicle Information</p>
					</div>

					<Separator orientation="vertical" />

					<div className="flex h-6 items-center gap-4">
						<span>Profile</span>

						<Separator orientation="vertical" />

						<span>Settings</span>
					</div>
				</div>

				<Alert
					variant="success"
					title="Saved successfully"
					description="Your changes have been saved."
				/>

				<DropdownMenu>
					<DropdownMenuTrigger className="inline-flex size-9 items-center justify-center rounded-md hover:bg-secondary">
						<MoreHorizontal size={18} />
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<Pencil size={16} />
							Edit
						</DropdownMenuItem>

						<DropdownMenuItem>
							<Trash2 size={16} />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Tooltip content="Delete">
					<Button size="icon" variant="ghost">
						<Trash2 size={16} />
					</Button>
				</Tooltip>

				<Popover>
					<PopoverTrigger className="rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary">
						Filters
					</PopoverTrigger>

					<PopoverContent>
						<PopoverHeader>
							<PopoverTitle>Filter customers</PopoverTitle>

							<PopoverDescription>
								Choose the filters you want to apply.
							</PopoverDescription>
						</PopoverHeader>

						<div className="space-y-3">
							<Select
								options={[
									{
										label: "Active",
										value: "active",
									},
									{
										label: "Inactive",
										value: "inactive",
									},
								]}
								onChange={(value) => console.log(value)}
							/>

							<Button className="w-full">Apply Filters</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</main>
	);
}

export default App;
