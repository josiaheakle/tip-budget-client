// dependencies
import * as React from "react";
import * as MUI from "@mui/material";

// components
import { HelperText } from "../../reusables/HelperText";
import { RequestHandler } from "../../../modules/RequestHandler";

// types
import { StandardResponse } from "../../../types/StandardResponse";
import { User } from "../../../types/schemas/User";

interface LoginProps {
	setUser: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
	const [isNewAccount, setIsNewAccount] = React.useState(false);

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

	const fetchLogin = async (): Promise<StandardResponse> => {
		const body = await RequestHandler.apiPost("/user/login", {
			email: email,
			password: password,
		});
		return body;
	};

	const fetchRegister = async (): Promise<StandardResponse> => {
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

		return body;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		clearErrors();
		const res = await (isNewAccount ? fetchRegister() : fetchLogin());
		// console.log({ res });
		if (res.valid) {
			localStorage.setItem(`jwt`, res.data.token);
			setUser(res.data.user);
		} else {
			updateErrorMessages(res.errors);
		}
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
	}, [isNewAccount]);

	return (
		<MUI.Container
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<MUI.Card
				style={{
					width: "fit-content",
				}}
			>
				<MUI.Container>
					<MUI.CardHeader
						title={<h3>{isNewAccount ? `Register` : `Login`}</h3>}
					></MUI.CardHeader>
					<MUI.CardContent>
						<form
							onSubmit={handleSubmit}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							{isNewAccount ? (
								<>
									<MUI.TextField
										onChange={(e) => setFirstName(e.target.value)}
										className="space-bottom"
										label="First Name"
										error={doesHaveErrors(firstNameErrors)}
										helperText={
											firstNameErrors ? (
												<HelperText errors={firstNameErrors} />
											) : null
										}
									></MUI.TextField>
									<MUI.TextField
										onChange={(e) => setLastName(e.target.value)}
										className="space-bottom"
										label="Last Name"
										error={doesHaveErrors(lastNameErrors)}
										helperText={
											lastNameErrors ? (
												<HelperText errors={lastNameErrors} />
											) : null
										}
									></MUI.TextField>
								</>
							) : null}
							<MUI.TextField
								onChange={(e) => setEmail(e.target.value)}
								className="space-bottom"
								type="email"
								label="Email"
								error={doesHaveErrors(emailErrors)}
								helperText={
									emailErrors ? <HelperText errors={emailErrors} /> : null
								}
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
							{isNewAccount ? (
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
							) : null}
							<MUI.Button
								variant="contained"
								className="space-bottom"
								type="submit"
								style={{
									width: "fit-content",
								}}
							>
								{isNewAccount ? `Register` : `Login`}
							</MUI.Button>

							<MUI.Link
								style={{ cursor: "pointer" }}
								onClick={() => setIsNewAccount(!isNewAccount)}
							>
								{isNewAccount ? `Use an existing account` : `Create an account`}
							</MUI.Link>
							{/* </MUI.Container> */}
						</form>
					</MUI.CardContent>
				</MUI.Container>
			</MUI.Card>
		</MUI.Container>
	);
};

export { Login };
