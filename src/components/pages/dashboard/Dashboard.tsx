import * as React from "react";
import { AppContext } from "../../AppContext";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
	return (
		<AppContext.Consumer>
			{({ user }) => {
				console.log({ user });
				return (
					<div>
						<h1>
							DASHBOARD {user?.firstName} {user?.lastName}
						</h1>
					</div>
				);
			}}
		</AppContext.Consumer>
	);
};

export { Dashboard };
