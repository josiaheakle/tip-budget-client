// dependencies
import * as React from "react";
import * as MUI from "@mui/material";

// modules
import { UserHandler } from "../modules/UserHandler";

// components
import { Login } from "./pages/user/Login";
import { AppContext } from "./AppContext";

// types
import { User } from "../types/schemas";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ChecklistPage } from "./pages/checklists/ChecklistPage";

function App() {
	const [user, setUser] = React.useState<User | null>();

	React.useEffect(() => {
		UserHandler.getActiveUser().then((val) => {
			console.log({ user: val });
			setUser(val);
		});
	}, []);

	return (
		<AppContext.Provider value={{ user: user, setUser: setUser }}>
			<div
				className="App"
				style={{
					backgroundColor: MUI.colors.lightBlue[50],
				}}
			>
				{user === undefined || user === null ? (
					<Login setUser={setUser} />
				) : (
					<ChecklistPage user={user} />
				)}
			</div>
		</AppContext.Provider>
	);
}

export default App;
