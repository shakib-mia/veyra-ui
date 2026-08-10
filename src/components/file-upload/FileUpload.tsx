import { UploadCloud, X } from "lucide-react";
import {
	useCallback,
	useRef,
	useState,
	type ChangeEvent,
	type DragEvent,
} from "react";
import { cn } from "../../main";
import FileThumbnail from "./FileThumbnail";

export interface FileUploadError {
	file: File;
	message: string;
}

interface FileUploadProps {
	value?: File[];
	onChange?: (files: File[]) => void;
	onError?: (errors: FileUploadError[]) => void;

	multiple?: boolean;
	accept?: string;
	maxFiles?: number;
	maxSize?: number;

	preview?: boolean;
	disabled?: boolean;
	loading?: boolean;

	title?: string;
	description?: string;

	className?: string;
}

const formatFileSize = (bytes: number) => {
	if (bytes === 0) {
		return "0 Bytes";
	}

	const units = ["Bytes", "KB", "MB", "GB"];

	const index = Math.floor(Math.log(bytes) / Math.log(1024));

	return `${(bytes / 1024 ** index).toFixed(2)} ${units[index]}`;
};

const matchesAccept = (file: File, accept?: string) => {
	if (!accept) {
		return true;
	}

	const acceptedTypes = accept
		.split(",")
		.map((type) => type.trim().toLowerCase())
		.filter(Boolean);

	return acceptedTypes.some((type) => {
		if (type.startsWith(".")) {
			return file.name.toLowerCase().endsWith(type);
		}

		if (type.endsWith("/*")) {
			return file.type.toLowerCase().startsWith(type.replace("/*", "/"));
		}

		return file.type.toLowerCase() === type;
	});
};

export default function FileUpload({
	value = [],
	onChange,
	onError,
	multiple = false,
	accept,
	maxFiles = 5,
	maxSize,
	preview = true,
	disabled = false,
	loading = false,
	title = "Click to upload or drag and drop",
	description,
	className,
}: FileUploadProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const files = value;

	const disabledState = disabled || loading;

	const validateFiles = useCallback(
		(selectedFiles: File[]) => {
			const validFiles: File[] = [];
			const errors: FileUploadError[] = [];

			selectedFiles.forEach((file) => {
				if (!matchesAccept(file, accept)) {
					errors.push({
						file,
						message: `${file.name} is not an accepted file type.`,
					});
					return;
				}

				if (maxSize !== undefined && file.size > maxSize) {
					errors.push({
						file,
						message: `${file.name} exceeds the maximum size of ${formatFileSize(maxSize)}.`,
					});
					return;
				}

				validFiles.push(file);
			});

			return {
				validFiles,
				errors,
			};
		},
		[accept, maxSize],
	);

	const addFiles = useCallback(
		(selectedFiles: File[]) => {
			if (disabledState || selectedFiles.length === 0) {
				return;
			}

			const { validFiles, errors } = validateFiles(selectedFiles);

			if (errors.length > 0) {
				onError?.(errors);
			}

			if (validFiles.length === 0) {
				return;
			}

			let nextFiles: File[];

			if (!multiple) {
				nextFiles = validFiles.slice(0, 1);
			} else {
				const remainingSlots = Math.max(0, maxFiles - files.length);

				nextFiles = [...files, ...validFiles.slice(0, remainingSlots)];
			}

			onChange?.(nextFiles);
		},
		[
			disabledState,
			files,
			maxFiles,
			multiple,
			onChange,
			onError,
			validateFiles,
		],
	);

	const removeFile = (index: number) => {
		onChange?.(files.filter((_, fileIndex) => fileIndex !== index));
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		addFiles(Array.from(event.target.files ?? []));

		event.target.value = "";
	};

	const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();

		setIsDragging(false);

		if (disabledState) {
			return;
		}

		addFiles(Array.from(event.dataTransfer.files));
	};

	const uploadAreaDisabled =
		disabledState ||
		(!multiple && files.length >= 1) ||
		(multiple && files.length >= maxFiles);

	return (
		<div className={cn("w-full space-y-3", className)}>
			<label
				onDragOver={(event) => {
					event.preventDefault();

					if (!uploadAreaDisabled) {
						setIsDragging(true);
					}
				}}
				onDragLeave={() => {
					setIsDragging(false);
				}}
				onDrop={handleDrop}
				className={cn(
					"flex min-h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors",
					"border-border bg-background",
					!uploadAreaDisabled &&
						"cursor-pointer hover:border-primary/50 hover:bg-muted/30",
					isDragging && "border-primary bg-primary/5",
					uploadAreaDisabled && "cursor-not-allowed opacity-50",
				)}
			>
				<input
					ref={inputRef}
					type="file"
					className="hidden"
					accept={accept}
					multiple={multiple}
					disabled={uploadAreaDisabled}
					onChange={handleInputChange}
				/>

				<div className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
					<UploadCloud size={20} className="text-muted-foreground" />
				</div>

				<p className="text-sm font-medium">
					{loading ? "Uploading..." : title}
				</p>

				<p className="mt-1 text-xs text-muted-foreground">
					{description ??
						(multiple
							? `${files.length}/${maxFiles} files selected`
							: "Choose a file")}
				</p>
			</label>

			{files.length > 0 && (
				<div className="space-y-2">
					{files.map((file, index) => (
						<div
							key={`${file.name}-${file.lastModified}-${index}`}
							className="flex items-center gap-3 rounded-lg border border-border p-3"
						>
							<div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
								<FileThumbnail file={file} preview={preview} />
							</div>

							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium">
									{file.name}
								</p>

								<p className="text-xs text-muted-foreground">
									{formatFileSize(file.size)}
								</p>
							</div>

							<button
								type="button"
								disabled={disabledState}
								onClick={() => removeFile(index)}
								className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted disabled:opacity-50"
								aria-label={`Remove ${file.name}`}
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
