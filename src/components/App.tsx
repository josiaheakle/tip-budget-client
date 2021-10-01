import { Login } from "./pages/user/Login";
import * as MUI from "@mui/material";

function App() {
	return (
		<div
			className="App"
			style={{
				backgroundColor: MUI.colors.lightBlue[50],
			}}
		>
			<Login></Login>
		</div>
	);
}

export default App;
