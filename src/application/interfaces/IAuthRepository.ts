export interface IAuthRepository {
    authenticate(username: string, password: string): Promise<string>;
}