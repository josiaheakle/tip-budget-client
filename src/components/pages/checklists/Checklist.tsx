import * as React from "react";
import { Checklist as ChecklistType } from "../../../types/schemas/Checklist";

interface ChecklistProps {
	checklist: ChecklistType;
}

const Checklist: React.FC<ChecklistProps> = ({ checklist }) => {
	return <h1>{checklist.title}</h1>;
};

export { Checklist };
