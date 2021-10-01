import { formatMuiErrorMessage } from "@mui/utils";
import * as React from "react";

interface HelperTextProps {
	errors: Array<string>;
}

const HelperText: React.FC<HelperTextProps> = ({ errors }) => {
	return (
		<span style={{ display: "flex", flexDirection: "column" }}>
			{errors.map((e, i) => (
				<span key={i}>{e}</span>
			))}
		</span>
	);
};

export { HelperText };
