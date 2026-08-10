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
import { Car, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Tooltip } from "./components/tooltip/tooltip";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "./components/popover/popover";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "./components/tabs/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./components/accordion/accordion";
import { Avatar } from "./components/avatar/avatar";
import { Spinner } from "./components/spinner/spinner";
import { EmptyState } from "./components/empty-state/empty-state";
import { Pagination } from "./components/pagination/pagination";
import type { DataTableColumn } from "./components/table/types";
import DataTable from "./components/table/DataTable";

function App() {
	// const [page, setPage] = useState(1);

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
	const [tableLoading, setTableLoading] = useState(true);

	setTimeout(() => {
		setTableLoading(false);
	}, 5000);

	type Part = {
		id: string;
		name: string;
		partsNo: string;
		brand: string;
		quantity: number;
		status: string;
	};

	const parts: Part[] = Array.from({ length: 47 }, (_, index) => ({
		id: `PAR-${String(index + 1).padStart(6, "0")}`,
		name: "Engine Oil 5W-30",
		partsNo: String(index + 1),
		brand: "Castrol",
		quantity: index + 1,
		status: index % 2 === 0 ? "NEW" : "USED",
	}));

	const columns: DataTableColumn<Part>[] = [
		{
			key: "id",
			header: "ID",
		},

		{
			key: "name",
			header: "Name",
		},

		{
			key: "partsNo",
			header: "Parts No",
		},

		{
			key: "brand",
			header: "Brand",
		},

		{
			key: "quantity",
			header: "Quantity",
		},

		{
			key: "status",
			header: "Status",
			render: ({ value }) => (
				<span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
					{String(value)}
				</span>
			),
		},
	];

	// const [serverPage, setServerPage] = useState(1);

	// const serverPageSize = 10;

	// const serverTotal = 47;

	// const serverTotalPages = Math.ceil(serverTotal / serverPageSize);

	/**
	 * Simulate backend response.
	 */

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	const response = {
		data: parts.slice((page - 1) * limit, page * limit),

		meta: {
			total: parts.length,
			page,
			limit,
			totalPages: Math.ceil(parts.length / limit),
		},
	};

	return (
		<main className="min-h-screen p-8">
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

				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>

						<TabsTrigger value="vehicles">Vehicles</TabsTrigger>

						<TabsTrigger value="work-orders">
							Work Orders
						</TabsTrigger>

						<TabsTrigger value="invoices">Invoices</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<Card>
							<CardContent>Customer overview</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<Accordion defaultValue="vehicle">
					<AccordionItem value="vehicle">
						<AccordionTrigger value="vehicle">
							Vehicle Information
						</AccordionTrigger>

						<AccordionContent value="vehicle">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-muted-foreground">
										Registration No.
									</p>

									<p className="font-medium">DHA-123456</p>
								</div>

								<div>
									<p className="text-xs text-muted-foreground">
										Model
									</p>

									<p className="font-medium">Toyota Axio</p>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="customer">
						<AccordionTrigger value="customer">
							Customer Information
						</AccordionTrigger>

						<AccordionContent value="customer">
							Customer details here...
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<div className="-space-x-4 flex items-center">
					<Avatar size="sm" fallback="SM" />
					<Avatar size="md" fallback="SM" />
					<Avatar size="lg" fallback="SM" />
					<Avatar size="xl" fallback="SM" />
				</div>

				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
				<Spinner size="xl" />

				<div className="rounded-xl border border-border bg-card">
					<EmptyState
						icon={<Car size={22} />}
						title="No vehicles yet"
						description="Add your first vehicle to get started."
						action={<Button>Add Vehicle</Button>}
					/>
				</div>

				<Pagination
					page={page}
					totalPages={10}
					onPageChange={setPage}
				/>

				{/* Client-side pagination */}

				<section className="space-y-4">
					<h2 className="text-xl font-semibold">
						Client-side Pagination
					</h2>

					<DataTable
						data={parts}
						columns={columns}
						searchable
						searchPlaceholder="Search"
						filters={[
							{
								key: "status",
								label: "Status",
								type: "select",
								placeholder: "All Status",
								options: [
									{
										label: "All",
										value: "all",
									},
									{
										label: "New",
										value: "NEW",
									},
									{
										label: "Used",
										value: "USED",
									},
								],
							},
						]}
						pagination={{
							mode: "client",
							defaultPageSize: 10,
							pageSizeOptions: [10, 25, 50],
						}}
					/>
				</section>

				{/* Server-side pagination */}

				<section className="space-y-4">
					<h2 className="text-xl font-semibold">
						Server-side Pagination
					</h2>

					<DataTable
						data={response.data}
						columns={columns}
						loading={tableLoading}
						onRowClick={(row) => console.log(row)}
						filters={[
							{
								key: "status",
								label: "Status",
								type: "select",
								placeholder: "All Status",
								options: [
									{
										label: "All",
										value: "all",
									},
									{
										label: "New",
										value: "NEW",
									},
									{
										label: "Used",
										value: "USED",
									},
								],
							},
						]}
						pagination={{
							mode: "server",
							page: response.meta.page,
							pageSize: response.meta.limit,
							total: response.meta.total,
							totalPages: response.meta.totalPages,
							pageSizeOptions: [10, 25],

							onPageChange: setPage,

							onPageSizeChange: (newLimit) => {
								setLimit(newLimit);
								setPage(1);
							},
						}}
					/>
				</section>
			</div>
		</main>
	);
}

export default App;
