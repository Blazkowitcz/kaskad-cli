export interface IConfigRepository {
    saveConfig(attribute: string, value: string): boolean;
    getConfig(attribute: string): string;
}