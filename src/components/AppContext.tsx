import * as React from "react";
import { ApplyCodeActionCommandResult } from "typescript";
import { User } from "../types/schemas";

type AppContextType = {
	user: User | null;
	setUser: (u: User) => void;
};

export const AppContext = React.createContext<Partial<AppContextType>>({});
