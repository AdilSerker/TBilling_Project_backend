import { IsString } from "class-validator";

export class LoginParamForm {

	@IsString()
	public password: string;

}
