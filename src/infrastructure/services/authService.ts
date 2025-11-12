import axios from "axios";
import { IAuthRepository } from "../../application/interfaces/IAuthRepository";
import { ConfigRepository } from "../repositories/configRepository";

export class AuthService implements IAuthRepository {
    constructor(private configRepository: ConfigRepository) {}

    /**
     * Authenticate user and save token into config
     * @param username {String}
     * @param password {String}
     * @returns {Promise<string>}
     */
    async authenticate(username: string, password: string): Promise<string> {
        try{
            const res = await axios.post('http://localhost:3000/auth/signin', {username, password});
            const data = res.data;
            this.configRepository.saveConfig('token', data.token);
            return data.token;
        }catch(e){
            console.error("Error during authentication");
            throw e;
        }
    }
}