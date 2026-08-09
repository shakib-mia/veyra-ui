import { Button } from "./components/button/button";

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
			</div>
		</main>
	);
}

export default App;
