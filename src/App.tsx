import { Badge } from "./components/badge";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";

function App() {
	return (
		<main className="min-h-screen bg-background p-8">
			<div className="mx-auto max-w-5xl">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold tracking-tight">
						Veyra UI
					</h1>

					<p className="mt-1 text-sm text-muted-foreground">
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

				<div className="flex flex-wrap gap-3 items-center mt-8">
					<Badge>Default</Badge>

					<Badge variant="primary">Active</Badge>

					<Badge variant="success">Completed</Badge>

					<Badge variant="warning">Pending</Badge>

					<Badge variant="danger">Cancelled</Badge>

					<Badge variant="info">Processing</Badge>

					<Badge variant="outline">Draft</Badge>
				</div>

				<div className="grid grid-cols-4 gap-3 items-center mt-8">
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
			</div>
		</main>
	);
}

export default App;
