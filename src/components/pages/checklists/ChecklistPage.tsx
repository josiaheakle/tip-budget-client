import * as React from "react";
import * as MUI from "@mui/material";

import { RequestHandler } from "../../../modules/RequestHandler";

import { StandardResponse } from "../../../types/StandardResponse";
import { User } from "../../../types/schemas";
import { useChecklists } from "../../../hooks/checklist_hooks/useChecklists";
import { UserHandler } from "../../../modules/UserHandler";
import { Checklist } from "./Checklist";

import { Checklist as ChecklistType } from "../../../types/schemas/Checklist";

interface ChecklistPageProps {
	user: User;
}

const ChecklistPage: React.FC<ChecklistPageProps> = (props) => {
	const checklists = useChecklists(UserHandler.checkForToken());

	return (
		<MUI.Container
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-around",
				width: "100vw",
				height: "100vh",
			}}
		>
			<h1>Hello, {props.user.firstName ?? ""}!</h1>
			<MUI.Container
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
					width: "100vw",
					height: "50vh",
				}}
			>
				<MUI.Card>
					<MUI.CardHeader title="All checklists"></MUI.CardHeader>
					<MUI.CardContent>
						{checklists?.map((c) => (
							<Checklist checklist={c} />
						))}
					</MUI.CardContent>
				</MUI.Card>
				<MUI.Card>
					<MUI.CardHeader title="fuck you"></MUI.CardHeader>
					<MUI.CardContent>i am the card content</MUI.CardContent>
				</MUI.Card>
			</MUI.Container>
		</MUI.Container>
	);
};

export { ChecklistPage };
