import {IAuthRepository} from "../interfaces/IAuthRepository";

export class AuthenticateUseCase {
    constructor(private authRepository: IAuthRepository) {}

    async execute(username: string, password: string): Promise<string> {
        const token = await this.authRepository.authenticate(username, password);
        console.log("✅ Authentication success !");
        return token;
    }
}