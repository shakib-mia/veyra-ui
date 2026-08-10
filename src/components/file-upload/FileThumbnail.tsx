import { useEffect, useState } from "react";
import { File, FileImage } from "lucide-react";

interface FileThumbnailProps {
	file: File;
	preview?: boolean;
}

export default function FileThumbnail({
	file,
	preview = true,
}: FileThumbnailProps) {
	const [src, setSrc] = useState<string>();

	useEffect(() => {
		if (!preview || !file.type.startsWith("image/")) {
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result === "string") {
				setSrc(reader.result);
			}
		};

		reader.readAsDataURL(file);

		return () => {
			reader.abort();
		};
	}, [file, preview]);

	if (!file.type.startsWith("image/")) {
		return <File size={19} className="text-muted-foreground" />;
	}

	if (!preview) {
		return <FileImage size={19} className="text-muted-foreground" />;
	}

	if (!src) {
		return (
			<FileImage
				size={19}
				className="animate-pulse text-muted-foreground"
			/>
		);
	}

	return <img src={src} alt={file.name} className="size-full object-cover" />;
}
