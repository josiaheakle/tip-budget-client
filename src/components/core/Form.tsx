import * as React from "react";

interface FormProps extends React.HTMLProps<HTMLFormElement> {}

const Form: React.FC<FormProps> = (props) => {
	return (
		<form className="align-vertial" {...props}>
			{props.children}
			<button style={{ width: "fit-content" }} type="submit">
				submit
			</button>
		</form>
	);
};

export { Form };
