import * as React from "react";
import { ApplyCodeActionCommandResult } from "typescript";
import { User } from "../types/schemas";

type AppContextType = {
	user: User | null;
};

export const AppContext = React.createContext<Partial<AppContextType>>({});
