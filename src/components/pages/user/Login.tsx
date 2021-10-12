// dependencies
import * as React from "react";
import * as MUI from "@mui/material";

// components
import { HelperText } from "../../reusables/HelperText";
import { RequestHandler } from "../../../modules/RequestHandler";

// types
import { StandardResponse } from "../../../types/StandardResponse";
import { User } from "../../../types/schemas/User";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";

interface LoginProps {
	setUser: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
	const [isNewAccount, setIsNewAccount] = React.useState(false);

	const onSubmit = (res: StandardResponse) => {
		if (res.valid) {
			localStorage.setItem(`jwt`, res.data.token);
			setUser(res.data.user);
		}
	};

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
						{isNewAccount ? (
							<RegisterForm onRegister={onSubmit} />
						) : (
							<LoginForm onLogin={onSubmit} />
						)}

						<MUI.Link
							style={{ cursor: "pointer" }}
							onClick={() => setIsNewAccount(!isNewAccount)}
						>
							{isNewAccount ? `Use an existing account` : `Create an account`}
						</MUI.Link>
					</MUI.CardContent>
				</MUI.Container>
			</MUI.Card>
		</MUI.Container>
	);
};

export { Login };
