import { StandardResponse } from "../types/StandardResponse";

export const RequestHandler = (() => {
	const apiPost = async (
		apiUrl: string,
		body: {},
		token?: string
	): Promise<StandardResponse> => {
		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}${apiUrl}`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const resBody: StandardResponse = await res.json();
		return resBody;
	};

	const apiTokenPost = async (
		apiUrl: string,
		body: {},
		token?: string
	): Promise<StandardResponse> => {
		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}${apiUrl}`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});
		const resBody: StandardResponse = await res.json();
		return resBody;
	};

	return {
		apiPost,
		apiTokenPost,
	};
})();
