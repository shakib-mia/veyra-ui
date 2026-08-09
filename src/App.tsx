import { useState } from "react";
import { Badge } from "./components/badge";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";
import { Select, type SelectOption } from "./components/select/select";
import { Textarea } from "./components/textarea";
import { Checkbox } from "./components/checkbox/checkbox";
import { Radio } from "./components/radio/radio";
import { Switch } from "./components/switch/switch";

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
			</div>
		</main>
	);
}

export default App;
