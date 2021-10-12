import * as React from "react";
import * as MUI from "@mui/material";

import { RequestHandler } from "../../../modules/RequestHandler";
import { StandardResponse } from "../../../types/StandardResponse";
import { HelperText } from "../../reusables/HelperText";

interface RegisterFormProps {
	onRegister: (response: StandardResponse) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
	const [email, setEmail] = React.useState<string>();
	const [emailErrors, setEmailErrors] = React.useState<Array<string>>();

	const [password, setPassword] = React.useState<string>();
	const [passwordErrors, setPasswordErrors] = React.useState<Array<string>>();

	const [passwordVerify, setPasswordVerify] = React.useState<string>();
	const [passwordVerifyErrors, setPasswordVerifyErrors] =
		React.useState<Array<string>>();

	const [firstName, setFirstName] = React.useState<string>();
	const [firstNameErrors, setFirstNameErrors] = React.useState<Array<string>>();

	const [lastName, setLastName] = React.useState<string>();
	const [lastNameErrors, setLastNameErrors] = React.useState<Array<string>>();

	const fetchRegister = async (event: React.FormEvent) => {
		event.preventDefault();

		if (password !== passwordVerify) {
			return {
				valid: false,
				errors: {
					passwordVerify: ["Passwords must match."],
				},
			};
		}

		const body = await RequestHandler.apiPost("/user/register", {
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
		});

		if (body.valid === false) updateErrorMessages(body.errors);

		onRegister(body);
	};

	const updateErrorMessages = (errors: { [index: string]: Array<string> }) => {
		if (errors) {
			Object.keys(errors).forEach((error) => {
				switch (error) {
					case "password":
						setPasswordErrors(errors[error]);
						break;
					case "passwordVerify":
						setPasswordVerifyErrors(errors[error]);
						break;

					case "firstName":
						setFirstNameErrors(errors[error]);
						break;
					case "lastName":
						setLastNameErrors(errors[error]);
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
		setPasswordVerifyErrors([]);
		setFirstNameErrors([]);
		setLastNameErrors([]);
		setEmailErrors([]);
	};

	React.useEffect(() => {
		clearErrors();
	}, []);

	return (
		<form
			onSubmit={fetchRegister}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<MUI.TextField
				onChange={(e) => setFirstName(e.target.value)}
				className="space-bottom"
				label="First Name"
				error={doesHaveErrors(firstNameErrors)}
				helperText={
					firstNameErrors ? <HelperText errors={firstNameErrors} /> : null
				}
			></MUI.TextField>
			<MUI.TextField
				onChange={(e) => setLastName(e.target.value)}
				className="space-bottom"
				label="Last Name"
				error={doesHaveErrors(lastNameErrors)}
				helperText={
					lastNameErrors ? <HelperText errors={lastNameErrors} /> : null
				}
			></MUI.TextField>
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

			<MUI.TextField
				onChange={(e) => setPasswordVerify(e.target.value)}
				className="space-bottom"
				type="password"
				label="Verify Password"
				error={doesHaveErrors(passwordVerifyErrors)}
				// helperText={passwordVerifyErrors ? passwordVerifyErrors : false}
				helperText={
					passwordVerifyErrors ? (
						<HelperText errors={passwordVerifyErrors} />
					) : null
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
				Register
			</MUI.Button>
		</form>
	);
};

export { RegisterForm };
