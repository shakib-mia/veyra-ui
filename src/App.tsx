import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Alert,
	Avatar,
	Badge,
	Button,
	Card,
	Checkbox,
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	EmptyState,
	FileUpload,
	FormDialog,
	FormProvider,
	Input,
	Label,
	PageHeader,
	RadioGroup,
	RadioGroupItem,
	Select,
	Separator,
	Skeleton,
	Spinner,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Textarea,
	Tooltip,
} from "./index";

import { useState } from "react";
import { MoreHorizontal, Plus, Search, UserPlus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormField } from "./index";

import { DataTable } from "./components/table";

interface Customer {
	id: number;
	name: string;
	email: string;
	phone: string;
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	type: "Individual" | "Business";
	joinedAt: string;
}

const customers: Customer[] = [
	{
		id: 1,
		name: "Rahim Ahmed",
		email: "rahim@example.com",
		phone: "+880 1711-123456",
		status: "ACTIVE",
		type: "Individual",
		joinedAt: "12 Aug 2026",
	},
	{
		id: 2,
		name: "Karim Motors",
		email: "info@karimmotors.com",
		phone: "+880 1812-456789",
		status: "ACTIVE",
		type: "Business",
		joinedAt: "10 Aug 2026",
	},
	{
		id: 3,
		name: "Sabbir Hossain",
		email: "sabbir@example.com",
		phone: "+880 1912-987654",
		status: "PENDING",
		type: "Individual",
		joinedAt: "08 Aug 2026",
	},
	{
		id: 4,
		name: "Nusrat Jahan",
		email: "nusrat@example.com",
		phone: "+880 1612-456123",
		status: "ACTIVE",
		type: "Individual",
		joinedAt: "05 Aug 2026",
	},
	{
		id: 5,
		name: "ABC Auto Care",
		email: "contact@abcauto.com",
		phone: "+880 1512-654321",
		status: "INACTIVE",
		type: "Business",
		joinedAt: "01 Aug 2026",
	},
];

const playgroundFormSchema = z.object({
	name: z.string().min(1, "Customer name is required"),
	email: z
		.string()
		.email("Please enter a valid email address")
		.optional()
		.or(z.literal("")),
	phone: z.string().min(1, "Phone number is required"),
	type: z.string().min(1, "Customer type is required"),
	notes: z.string().optional(),
});
type PlaygroundFormValues = z.infer<typeof playgroundFormSchema>;

export default function App() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formDialogOpen, setFormDialogOpen] = useState(false);

	const [checked, setChecked] = useState(false);
	const [enabled, setEnabled] = useState(true);

	const [files, setFiles] = useState<File[]>([]);

	const [serverFilter, setServerFilter] = useState("");
	const [formLoading, setFormLoading] = useState(false);

	const form = useForm<PlaygroundFormValues>({
		resolver: zodResolver(playgroundFormSchema),
		defaultValues: { name: "", email: "", phone: "", type: "", notes: "" },
	});

	const handleFormSubmit = () => {
		setFormLoading(true);

		window.setTimeout(() => {
			setFormLoading(false);
			setFormDialogOpen(false);
		}, 1200);
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* ------------------------------------------------------- */}
			{/* Header */}
			{/* ------------------------------------------------------- */}

			<header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
					<div>
						<h1 className="text-xl font-bold tracking-tight">
							Veyra UI
						</h1>

						<p className="text-xs text-muted-foreground">
							Reusable React Component Library
						</p>
					</div>

					<div className="flex items-center gap-3">
						<Badge>Development</Badge>

						<Avatar fallback="SM" />
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-7xl space-y-12 px-6 py-10">
				{/* --------------------------------------------------- */}
				{/* Overview */}
				{/* --------------------------------------------------- */}

				<PageHeader
					title="Component Playground"
					description="Practical examples of the Veyra UI component library."
				/>

				{/* --------------------------------------------------- */}
				{/* Buttons */}
				{/* --------------------------------------------------- */}

				<Section
					title="Buttons"
					description="Actions, variants and loading states."
				>
					<Card>
						<div className="flex flex-wrap items-center gap-3 p-6">
							<Button>
								<Plus size={16} />
								Create
							</Button>

							<Button variant="secondary">Secondary</Button>

							<Button variant="outline">Outline</Button>

							<Button variant="ghost">Ghost</Button>

							<Button disabled>Disabled</Button>

							<Button loading>Saving...</Button>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Feedback */}
				{/* --------------------------------------------------- */}

				<Section
					title="Feedback & States"
					description="Communicate status, progress and empty states."
				>
					<Card>
						<div className="space-y-6 p-6">
							<div className="flex flex-wrap gap-2">
								<Badge>Active</Badge>

								<Badge variant="secondary">Pending</Badge>

								<Badge variant="outline">Archived</Badge>
								<Badge variant="destructive">Danger</Badge>
							</div>

							<Alert>
								Your profile has been updated successfully.
							</Alert>

							<div className="flex items-center gap-6">
								<div className="flex items-center gap-2">
									<Spinner />
									<span className="text-sm">
										Loading data...
									</span>
								</div>

								<Skeleton className="h-5 w-40" />

								<Skeleton className="h-5 w-24" />
							</div>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Form Controls */}
				{/* --------------------------------------------------- */}

				<Section
					title="Form Controls"
					description="Schema-aware form fields with automatic validation and required indicators."
				>
					{" "}
					<Card>
						{" "}
						<FormProvider form={form} schema={playgroundFormSchema}>
							{" "}
							<form
								onSubmit={form.handleSubmit((data) => {
									console.log("Submitted:", data);
								})}
								className="space-y-6 p-6"
							>
								{" "}
								<div className="grid gap-6 md:grid-cols-2">
									{" "}
									<FormField
										name="name"
										label="Customer Name"
										placeholder="Enter customer name"
									/>{" "}
									<FormField
										name="email"
										label="Email"
										type="email"
										placeholder="customer@example.com"
									/>{" "}
									<FormField
										name="phone"
										label="Phone"
										placeholder="+880 1XXXXXXXXX"
									/>{" "}
									<FormField
										name="type"
										label="Customer Type"
										type="select"
										placeholder="Select customer type"
										options={[
											{
												label: "Individual",
												value: "individual",
											},
											{
												label: "Business",
												value: "business",
											},
										]}
									/>{" "}
									<FormField
										name="notes"
										label="Notes"
										textarea
										placeholder="Additional customer information..."
										className="md:col-span-2"
									/>{" "}
								</div>{" "}
								<div className="flex justify-end">
									{" "}
									<Button type="submit">
										{" "}
										Submit Form{" "}
									</Button>{" "}
								</div>{" "}
							</form>{" "}
						</FormProvider>{" "}
					</Card>{" "}
				</Section>

				{/* --------------------------------------------------- */}
				{/* Selection */}
				{/* --------------------------------------------------- */}

				<Section
					title="Selection Controls"
					description="Checkbox, switch and radio group examples."
				>
					<Card>
						<div className="space-y-6 p-6">
							<div className="flex items-center gap-3">
								<Checkbox
									checked={checked}
									onCheckedChange={setChecked}
								/>

								<div>
									<p className="text-sm font-medium">
										Accept terms and conditions
									</p>

									<p className="text-xs text-muted-foreground">
										Required before submitting.
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium">
										Email notifications
									</p>

									<p className="text-xs text-muted-foreground">
										Receive account notifications.
									</p>
								</div>

								<Switch
									checked={enabled}
									onCheckedChange={setEnabled}
								/>
							</div>

							<Separator />

							<div className="space-y-3">
								<Label>Preferred contact method</Label>

								<RadioGroup
									name="plan"
									defaultValue="pro"
									onValueChange={(value) => {
										console.log("Selected:", value);
									}}
								>
									<RadioGroupItem
										value="free"
										label="Free"
										description="Basic features for personal use."
									/>

									<RadioGroupItem
										value="pro"
										label="Pro"
										description="Advanced features for professional users."
									/>

									<RadioGroupItem
										value="enterprise"
										label="Enterprise"
										description="For larger teams and organizations."
									/>
								</RadioGroup>
							</div>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Dates */}
				{/* --------------------------------------------------- */}

				{/* <Section
					title="Date & Range"
					description="Useful for bookings, invoices and reports."
				>
					<Card>
						<div className="grid gap-6 p-6 md:grid-cols-2">
							<div className="space-y-2">
								<Label>Booking Date</Label>

								<DatePicker value={date} onChange={setDate} />
							</div>

							<div className="space-y-2">
								<Label>Report Period</Label>

								<DateRangePicker />
							</div>
						</div>
					</Card>
				</Section> */}

				{/* --------------------------------------------------- */}
				{/* File Upload */}
				{/* --------------------------------------------------- */}

				<Section
					title="File Upload"
					description="Upload documents, images and attachments."
				>
					<Card>
						<div className="p-6">
							<FileUpload
								value={files}
								onChange={setFiles}
								multiple
								maxFiles={5}
								accept="image/*,.pdf"
								title="Upload customer documents"
								description="PNG, JPG or PDF up to your configured limit."
							/>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* DataTable */}
				{/* --------------------------------------------------- */}

				<Section
					title="Data Table"
					description="A realistic customer management table with search, filters, chips, actions and pagination."
				>
					<Card>
						<div className="p-6">
							<DataTable<Customer>
								data={customers}
								// rowAlign={"center"}
								headerAlign="center"
								rowAlign="left"
								columns={[
									{
										key: "customer",
										header: "Customer",

										render: ({ row }) => (
											<div className="flex items-center gap-3">
												<Avatar
													fallback={row.name
														.split(" ")
														.map((name) => name[0])
														.join("")
														.slice(0, 2)}
												/>

												<div>
													<p className="font-medium">
														{row.name}
													</p>

													<p className="text-xs text-muted-foreground">
														{row.email}
													</p>
												</div>
											</div>
										),
									},

									{
										key: "phone",
										header: "Phone",
										className: "text-center",
										headerClassName: "text-left",
										accessor: (row) => row.phone,
									},

									{
										key: "type",
										header: "Type",
										accessor: (row) => row.type,
									},

									{
										key: "status",
										header: "Status",
										render: ({ row }) => (
											<Badge
												variant={
													row.status === "ACTIVE"
														? "default"
														: row.status ===
															  "PENDING"
															? "secondary"
															: "outline"
												}
											>
												{row.status}
											</Badge>
										),
									},

									{
										key: "joinedAt",
										header: "Joined",
										accessor: (row) => row.joinedAt,
									},

									{
										key: "actions",
										header: "",
										className: "w-12",
										render: ({ row }) => (
											<DropdownMenu>
												<DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-secondary">
													<MoreHorizontal size={18} />
												</DropdownMenuTrigger>

												<DropdownMenuContent align="end">
													<DropdownMenuLabel>
														Actions
													</DropdownMenuLabel>

													<DropdownMenuItem
														onClick={() =>
															console.log(
																"View",
																row,
															)
														}
													>
														View customer
													</DropdownMenuItem>

													<DropdownMenuItem
														onClick={() =>
															console.log(
																"Edit",
																row,
															)
														}
													>
														Edit customer
													</DropdownMenuItem>

													<DropdownMenuSeparator />

													<DropdownMenuItem
														onClick={() =>
															console.log(
																"Delete",
																row.id,
															)
														}
													>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										),
									},
								]}
								searchable
								searchPlaceholder="Search customers..."
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
												label: "Active",
												value: "ACTIVE",
											},
											{
												label: "Pending",
												value: "PENDING",
											},
											{
												label: "Inactive",
												value: "INACTIVE",
											},
										],
									},
								]}
								filterValues={{
									status: serverFilter,
								}}
								onFilterChange={(_, value) =>
									setServerFilter(value)
								}
								showFilterChips
								pagination={{
									mode: "client",
									defaultPageSize: 5,
									pageSizeOptions: [5, 10],
								}}
							/>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Dialog */}
				{/* --------------------------------------------------- */}

				<Section
					title="Dialog"
					description="Use dialogs for confirmations and focused interactions."
				>
					<Card>
						<div className="flex flex-wrap gap-3 p-6">
							<Button onClick={() => setDialogOpen(true)}>
								Open Dialog
							</Button>

							<Button
								variant="outline"
								onClick={() => setFormDialogOpen(true)}
							>
								<UserPlus size={16} />
								Add Customer
							</Button>
						</div>
					</Card>

					<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Delete Customer</DialogTitle>

								<DialogDescription>
									This action cannot be undone.
								</DialogDescription>
							</DialogHeader>

							<DialogBody>
								<p className="text-sm text-muted-foreground">
									Are you sure you want to delete this
									customer?
								</p>
							</DialogBody>

							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setDialogOpen(false)}
								>
									Cancel
								</Button>

								<Button
									variant={"destructive"}
									onClick={() => setDialogOpen(false)}
								>
									Delete Customer
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Form Dialog */}
				{/* --------------------------------------------------- */}

				<FormDialog
					open={formDialogOpen}
					onOpenChange={setFormDialogOpen}
					title="Add Customer"
					description="Create a new customer record."
					submitLabel="Create Customer"
					cancelLabel="Cancel"
					loading={formLoading}
					onSubmit={handleFormSubmit}
				>
					<div className="grid gap-5 md:grid-cols-2">
						<div className="space-y-2">
							<Label>Customer Name</Label>

							<Input placeholder="John Doe" />
						</div>

						<div className="space-y-2">
							<Label>Email</Label>

							<Input
								type="email"
								placeholder="john@example.com"
							/>
						</div>

						<div className="space-y-2">
							<Label>Phone</Label>

							<Input placeholder="+880 1XXXXXXXXX" />
						</div>

						<div className="space-y-2">
							<Label>Type</Label>

							<Select
								options={[
									{
										label: "Individual",
										value: "individual",
									},
									{
										label: "Business",
										value: "business",
									},
								]}
								placeholder="Select type"
								isCreatable
							/>
						</div>

						<div className="space-y-2 md:col-span-2">
							<Label>Notes</Label>

							<Textarea placeholder="Customer notes..." />
						</div>
					</div>
				</FormDialog>

				{/* --------------------------------------------------- */}
				{/* Tabs */}
				{/* --------------------------------------------------- */}

				<Section
					title="Tabs"
					description="Organize related content into sections."
				>
					<Card>
						<div className="p-6">
							<Tabs defaultValue="overview">
								<TabsList>
									<TabsTrigger value="overview">
										Overview
									</TabsTrigger>

									<TabsTrigger value="activity">
										Activity
									</TabsTrigger>

									<TabsTrigger value="settings">
										Settings
									</TabsTrigger>
								</TabsList>

								<TabsContent value="overview">
									<div className="rounded-lg border border-border p-5">
										<h3 className="font-medium">
											Customer Overview
										</h3>

										<p className="mt-1 text-sm text-muted-foreground">
											General information and statistics.
										</p>
									</div>
								</TabsContent>

								<TabsContent value="activity">
									<div className="rounded-lg border border-border p-5">
										<h3 className="font-medium">
											Recent Activity
										</h3>

										<p className="mt-1 text-sm text-muted-foreground">
											Recent customer interactions.
										</p>
									</div>
								</TabsContent>

								<TabsContent value="settings">
									<div className="rounded-lg border border-border p-5">
										<h3 className="font-medium">
											Customer Settings
										</h3>

										<p className="mt-1 text-sm text-muted-foreground">
											Manage customer preferences.
										</p>
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Accordion */}
				{/* --------------------------------------------------- */}

				<Section
					title="Accordion"
					description="Expandable sections for FAQs and grouped information."
				>
					<Accordion defaultValue="general">
						<AccordionItem value="general">
							<AccordionTrigger value="general">
								What is Veyra UI?
							</AccordionTrigger>

							<AccordionContent value="general">
								Veyra UI is a reusable React component library
								designed for scalable application interfaces.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="typescript">
							<AccordionTrigger value="typescript">
								Is it TypeScript friendly?
							</AccordionTrigger>

							<AccordionContent value="typescript">
								Yes. Components are designed with strict
								TypeScript support.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="projects">
							<AccordionTrigger value="projects">
								Can it be used in different projects?
							</AccordionTrigger>

							<AccordionContent value="projects">
								Yes. The library is designed to be reusable
								across React applications.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Dropdown & Tooltip */}
				{/* --------------------------------------------------- */}

				<Section
					title="Dropdown & Tooltip"
					description="Compact contextual actions and additional information."
				>
					<Card>
						<div className="flex flex-wrap items-center gap-4 p-6">
							<DropdownMenu>
								<DropdownMenuTrigger className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary">
									Account Actions
								</DropdownMenuTrigger>

								<DropdownMenuContent>
									<DropdownMenuLabel>
										My Account
									</DropdownMenuLabel>

									<DropdownMenuItem>
										View Profile
									</DropdownMenuItem>

									<DropdownMenuItem>
										Edit Profile
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									<DropdownMenuItem>
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Tooltip content="Search customers">
								<Button variant="outline">
									<Search size={16} />
									Search
								</Button>
							</Tooltip>
						</div>
					</Card>
				</Section>

				{/* --------------------------------------------------- */}
				{/* Empty State */}
				{/* --------------------------------------------------- */}

				<Section
					title="Empty State"
					description="Useful when a collection has no data."
				>
					<Card>
						<div className="p-6">
							<EmptyState
								title="No vehicles found"
								description="There are no vehicles available for this organization yet."
							/>
						</div>
					</Card>
				</Section>

				{/* Footer */}
				<footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
					Veyra UI · Reusable React Component Library
				</footer>
			</main>
		</div>
	);
}

interface SectionProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

function Section({ title, description, children }: SectionProps) {
	return (
		<section className="space-y-4">
			<div>
				<h2 className="text-lg font-semibold">{title}</h2>

				<p className="text-sm text-muted-foreground">{description}</p>
			</div>

			{children}
		</section>
	);
}
