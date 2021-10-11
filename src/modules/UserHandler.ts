// check for token on load,
// if token, ping server to login
// on login redirect to dashboard

import { RequestHandler as ReqHandler } from "./RequestHandler";
import { StandardResponse } from "../types/StandardResponse";
import { User } from "../types/schemas";

export const UserHandler = (() => {
	const logoutUser = () => {
		localStorage.removeItem("jwt");
	};

	const getActiveUser = async (): Promise<User | null> => {
		const token = checkForToken();
		if (token) {
			const res = await loginWithToken(token);
			if (res.valid) {
				return res.data.user as User;
			} else return null;
		} else return null;
	};

	const checkForToken = (): string | false => {
		return localStorage.getItem("jwt") ?? false;
	};

	const loginWithToken = async (token: string): Promise<StandardResponse> => {
		return await ReqHandler.apiTokenPost("/user/token-login", {}, token);
	};

	return {
		getActiveUser,
		logoutUser,
		checkForToken,
	};
})();
