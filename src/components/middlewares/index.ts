import { SessionMiddleware } from "./Session";
import { CheckAuthorize } from "./CheckAuthorize";

export const middlewares = [
	SessionMiddleware,
	CheckAuthorize
];
