import * as React from "react";
import * as MUI from "@mui/material";

import { RequestHandler } from "../../../modules/RequestHandler";
import { StandardResponse } from "../../../types/StandardResponse";
import { HelperText } from "../../reusables/HelperText";

interface LoginFormProps {
	onLogin: (res: StandardResponse) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
	const [email, setEmail] = React.useState<string>();
	const [emailErrors, setEmailErrors] = React.useState<Array<string>>();

	const [password, setPassword] = React.useState<string>();
	const [passwordErrors, setPasswordErrors] = React.useState<Array<string>>();

	const fetchLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		clearErrors();

		const body = await RequestHandler.apiPost("/user/login", {
			email: email,
			password: password,
		});

		if (body.valid === false) {
			updateErrorMessages(body.errors);
		}

		onLogin(body);
	};

	const updateErrorMessages = (errors: { [index: string]: Array<string> }) => {
		if (errors) {
			Object.keys(errors).forEach((error) => {
				switch (error) {
					case "password":
						setPasswordErrors(errors[error]);
						break;
					case "email":
						setEmailErrors(errors[error]);
						break;
				}
			});
		}
	};

	const doesHaveErrors = (error: Array<string> | undefined): boolean => {
		if (error === undefined) return false;
		else return error.length > 0;
	};

	const clearErrors = () => {
		setPasswordErrors([]);
		setEmailErrors([]);
	};

	React.useEffect(() => {
		clearErrors();
	}, []);

	return (
		<form
			onSubmit={fetchLogin}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<MUI.TextField
				onChange={(e) => setEmail(e.target.value)}
				className="space-bottom"
				type="email"
				label="Email"
				error={doesHaveErrors(emailErrors)}
				helperText={emailErrors ? <HelperText errors={emailErrors} /> : null}
			></MUI.TextField>
			<MUI.TextField
				onChange={(e) => setPassword(e.target.value)}
				className="space-bottom"
				type="password"
				label="Password"
				error={doesHaveErrors(passwordErrors)}
				helperText={
					passwordErrors ? <HelperText errors={passwordErrors} /> : null
				}
			></MUI.TextField>
			<MUI.Button
				variant="contained"
				className="space-bottom"
				type="submit"
				style={{
					width: "fit-content",
				}}
			>
				Login
			</MUI.Button>
		</form>
	);
};

export { LoginForm };
