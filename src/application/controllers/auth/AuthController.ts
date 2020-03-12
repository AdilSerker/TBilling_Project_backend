import { AuthError } from './../../../components/http-error/AuthError';
import { User } from './../../../domain/user/User';
import { Body, Get, JsonController, OnUndefined, Param, Post, Session } from "routing-controllers";
import { Session as ExpressSession} from "../../../components/middlewares/Session";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { LoginParamForm } from "./validation/LoginParamForm";
import { userRepository } from './../../../infrastructure/repositories/UserRepository';


@JsonController("/api/auth")
export class AuthController {

	private userRepository: UserRepository = userRepository;

	@Post("/login/:login")
	public async login(
		@Param("login") login: string,
		@Body() { password }: LoginParamForm,
		@Session() session: Express.Session
	): Promise<User> {
		const user = await this.userRepository.get({ login });

		if (!user.checkPass(password)) {
			throw new AuthError("WrongPassword");
		}

		session.user = { id: user.id };

		return user;
	}

	@Get("/")
	public async isAuthorized(
		@Session() session: ExpressSession
	): Promise<User> {
		const isAuthorized = !!session.user;
		if (!isAuthorized) {
			return null;
		}

		const user = await this.userRepository.get({ id: session.user.id });

		return user;
	}

	@Get("/logout")
	@OnUndefined(204)
	public async logout(
		@Session() session: ExpressSession
	): Promise<void> {
		const { user } = session;

		if (user) {
			delete session.user;
		}
	}

}