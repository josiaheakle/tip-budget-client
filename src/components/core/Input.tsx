import * as React from "react";
import { Util } from "../../methods/Util";

interface InputProps {
	name: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	type?: string;
}

const Input: React.FC<InputProps> = ({ name, label, type, onChange }) => {
	return (
		<>
			<label htmlFor={`${name}-input`}>
				{label ? label : Util.toUpper(name)}
			</label>
			<input
				onChange={onChange}
				id={`${name}-input`}
				name={`${name}_input`}
				type={type ? type : "text"}
			></input>
		</>
	);
};

export { Input };
