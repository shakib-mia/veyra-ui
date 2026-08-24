import { useContext } from "react";

import { FormSchemaContext } from "./form-field.context";

export const useFormSchema = () => {
	const context = useContext(FormSchemaContext);

	if (!context) {
		throw new Error(
			"useFormSchema must be used inside Veyra FormProvider.",
		);
	}

	return context.schema;
};
