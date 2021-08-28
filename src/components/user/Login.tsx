import * as React from "react";
import { Card } from "../core/Card";
import { Page } from "../core/Page";
import { Form } from "../core/Form";
import { Input } from "../core/Input";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
	const [isNewAccount, setIsNewAccount] = React.useState<boolean>(false);

	const [username, setUsername] = React.useState<string>();
	const [password, setPassword] = React.useState<string>();
	const [firstName, setFirstName] = React.useState<string>();
	const [lastName, setLastName] = React.useState<string>();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("Login submit", username, password, firstName, lastName);

		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "asdf",
				password: "pppppassssword",
			}),
		});

		console.log(res);
	};

	return (
		<Page>
			<Card header={!isNewAccount ? `Login` : `Register`}>
				<Form onSubmit={handleSubmit}>
					{isNewAccount ? (
						<>
							<Input
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								name="firstName"
								label="First Name"
							/>
							<Input
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								name="lastName"
								label="Last Name"
							/>
							<Input
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								name="username"
							/>
							<Input
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								name="password"
								type="password"
							/>
						</>
					) : (
						<>
							<Input
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								name="username"
							/>
							<Input
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								name="password"
								type="password"
							/>
						</>
					)}
				</Form>
				<a
					onClick={(e) => {
						e.preventDefault();
						setIsNewAccount(!isNewAccount);
					}}
					href="#"
				>
					{!isNewAccount ? "Need an account?" : "Already have an account?"}
				</a>
			</Card>
		</Page>
	);
};

export { Login };
