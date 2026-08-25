import { useState } from "react";
import ReactSelect, { components } from "react-select";

import type {
	ActionMeta,
	SingleValue,
	MenuListProps,
	StylesConfig,
} from "react-select";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { selectVariants } from "./select.variants";

export type SelectOption = {
	label: string;
	value: string;
	disabled?: boolean;
};

export type SelectProps = VariantProps<typeof selectVariants> & {
	options: SelectOption[];

	value?: string;
	defaultValue?: string;

	placeholder?: string;
	className?: string;

	onChange?: (value: string) => void;

	isOptionDisabled?: (option: SelectOption) => boolean;

	menuPortalTarget?: HTMLElement;

	isDisabled?: boolean;
	isClearable?: boolean;
	isSearchable?: boolean;

	/**
	 * Show an "Add new" option at the bottom of the dropdown.
	 */
	isCreatable?: boolean;

	/**
	 * Called when the "Add new" option is clicked.
	 */
	onCreateOption?: () => void;

	/**
	 * Label for the "Add new" option.
	 */
	createOptionLabel?: string;
};

const Select = ({
	options,
	value,
	defaultValue = "",
	placeholder = "Select...",
	className,
	onChange,
	isOptionDisabled,
	menuPortalTarget,
	isDisabled = false,
	isClearable = false,
	isSearchable = true,
	isCreatable = false,
	onCreateOption,
	createOptionLabel = "Add new",
	size,
}: SelectProps) => {
	const [internalValue, setInternalValue] = useState(defaultValue);

	const isControlled = value !== undefined;

	const selectedValue = isControlled ? value : internalValue;

	const selectedOption =
		options.find((option) => option.value === selectedValue) ?? null;

	const handleChange = (
		option: SingleValue<SelectOption>,
		_actionMeta: ActionMeta<SelectOption>,
	) => {
		const nextValue = option?.value ?? "";

		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onChange?.(nextValue);
	};

	const styles: StylesConfig<SelectOption, false> = {
		control: (base, state) => ({
			...base,

			minHeight: size === "sm" ? 36 : size === "lg" ? 48 : 44,

			borderRadius: "var(--radius-lg)",

			borderColor: state.isFocused
				? "var(--color-ring)"
				: "var(--color-input)",

			backgroundColor: "var(--color-background)",

			boxShadow: state.isFocused
				? "0 0 0 3px color-mix(in srgb, var(--color-ring) 20%, transparent)"
				: "var(--shadow-xs)",

			transition:
				"border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)",

			cursor: isDisabled ? "not-allowed" : "pointer",

			opacity: isDisabled ? 0.6 : 1,

			"&:hover": {
				borderColor: state.isFocused
					? "var(--color-ring)"
					: "var(--color-input)",
			},
		}),

		valueContainer: (base) => ({
			...base,

			padding:
				size === "sm" ? "0 12px" : size === "lg" ? "0 16px" : "0 14px",
		}),

		placeholder: (base) => ({
			...base,

			color: "var(--color-muted-foreground)",
		}),

		singleValue: (base) => ({
			...base,

			color: "var(--color-foreground)",

			margin: 0,
		}),

		input: (base) => ({
			...base,

			color: "var(--color-foreground)",
		}),

		/*
		 * Important:
		 * The menu itself is rendered inside the portal.
		 */
		menu: (base) => ({
			...base,

			zIndex: 9999,

			marginTop: 4,

			borderRadius: "var(--radius-lg)",

			backgroundColor: "var(--color-popover)",

			boxShadow: "var(--shadow-md)",

			overflow: "hidden",
		}),

		/*
		 * Important:
		 * This controls the portal wrapper.
		 */
		menuPortal: (base) => ({
			...base,

			zIndex: 9999,
		}),

		menuList: (base) => ({
			...base,

			padding: 4,
		}),

		option: (base, state) => ({
			...base,

			padding: "8px 12px",

			borderRadius: "var(--radius-sm)",

			backgroundColor: state.isSelected
				? "var(--color-primary)"
				: state.isFocused
					? "var(--color-accent)"
					: "transparent",

			color: state.isSelected
				? "var(--color-primary-foreground)"
				: "var(--color-foreground)",

			cursor: state.isDisabled ? "not-allowed" : "pointer",

			opacity: state.isDisabled ? 0.5 : 1,
		}),

		indicatorSeparator: () => ({
			display: "none",
		}),

		dropdownIndicator: (base) => ({
			...base,

			color: "var(--color-muted-foreground)",

			padding: "0 10px",

			"&:hover": {
				color: "var(--color-foreground)",
			},
		}),

		clearIndicator: (base) => ({
			...base,

			color: "var(--color-muted-foreground)",

			"&:hover": {
				color: "var(--color-foreground)",
			},
		}),

		noOptionsMessage: (base) => ({
			...base,

			color: "var(--color-muted-foreground)",
		}),

		loadingMessage: (base) => ({
			...base,

			color: "var(--color-muted-foreground)",
		}),
	};

	/**
	 * Custom MenuList
	 *
	 * Adds an "Add new" action at the bottom of the dropdown.
	 */
	const MenuList = (props: MenuListProps<SelectOption, false>) => {
		return (
			<components.MenuList {...props}>
				{props.children}

				{isCreatable && (
					<div
						style={{
							marginTop: 8,
							paddingTop: 8,
							borderTop: "1px solid var(--color-border)",
						}}
					>
						<div
							role="button"
							tabIndex={0}
							onMouseDown={(event) => {
								event.preventDefault();
								event.stopPropagation();

								if (!isDisabled) {
									onCreateOption?.();
								}
							}}
							onKeyDown={(event) => {
								if (
									event.key === "Enter" ||
									event.key === " "
								) {
									event.preventDefault();

									if (!isDisabled) {
										onCreateOption?.();
									}
								}
							}}
							style={{
								padding: "10px 12px",

								borderRadius: "var(--radius-sm)",

								color: "var(--color-primary)",

								backgroundColor: "var(--color-background)",

								fontWeight: 500,

								cursor: isDisabled ? "not-allowed" : "pointer",

								opacity: isDisabled ? 0.5 : 1,

								userSelect: "none",
							}}
							onMouseEnter={(event) => {
								if (!isDisabled) {
									event.currentTarget.style.backgroundColor =
										"var(--color-accent)";
								}
							}}
							onMouseLeave={(event) => {
								event.currentTarget.style.backgroundColor =
									"var(--color-background)";
							}}
						>
							+ {createOptionLabel}
						</div>
					</div>
				)}
			</components.MenuList>
		);
	};

	return (
		<ReactSelect<SelectOption, false>
			options={options}
			value={selectedOption}
			placeholder={placeholder}
			isDisabled={isDisabled}
			isClearable={isClearable}
			isSearchable={isSearchable}
			menuPortalTarget={menuPortalTarget ?? document.body}
			styles={styles}
			className={cn(selectVariants({ size }), className)}
			isOptionDisabled={(option) =>
				option.disabled || isOptionDisabled?.(option) === true
			}
			components={{
				MenuList,
			}}
			onChange={handleChange}
		/>
	);
};

export { Select };
