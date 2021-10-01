interface ValidResponse {
	valid: true;
	data: { [index: string]: any };
}

interface InvalidResponse {
	valid: false;
	errors: ResponseErrors;
}

interface ResponseErrors {
	[index: string]: Array<string>;
}

type StandardResponse = ValidResponse | InvalidResponse;

export type { StandardResponse, ResponseErrors };
