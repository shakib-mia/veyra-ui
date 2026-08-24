# Table

The table module exports `DataTable` for application-ready tables and lower-level `Table`, `TableFilters`, `TableSearch`, and `TablePagination` primitives. See the [data API reference](reference.md#dates-files-and-data).

```tsx
import { DataTable, type DataTableColumn } from "veyra-ui";

type Customer = { id: number; name: string };

const columns: DataTableColumn<Customer>[] = [
	{ key: "name", header: "Name", accessor: (row) => row.name },
];

<DataTable<Customer> data={customers} columns={columns} />;
```

A column can use `accessor` for text or `render` for custom cells. Add search, filters, and pagination through the corresponding `DataTable` props or compose the lower-level primitives.
