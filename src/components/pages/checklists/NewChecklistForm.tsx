import * as React from "react";
import * as MUI from "@mui/material";

interface NewChecklistFormProps {}

const NewChecklistForm: React.FC<NewChecklistFormProps> = ({}) => {
	return (
		<form>
			<MUI.TextField></MUI.TextField>
		</form>
	);
};

export { NewChecklistForm };
