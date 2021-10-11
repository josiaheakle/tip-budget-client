import * as React from "react";
import { RequestHandler } from "../../modules/RequestHandler";
import { Checklist } from "../../types/schemas/Checklist";

export const useChecklists = (
	token: string | false
): Array<Checklist> | undefined => {
	const [checklists, setChecklists] = React.useState<Array<Checklist>>();
	React.useEffect(() => {
		if (token !== false) {
			(async () => {
				const res = await RequestHandler.apiTokenPost(
					"/checklist/all",
					{},
					token
				);
				if (res.valid) {
					setChecklists(res.data.checklists);
				}
			})();
		}
	}, []);
	return checklists;
};
