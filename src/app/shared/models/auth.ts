export type EmitHandler<T extends any[]> = (...args: T) => void;
export type Schema = Record<string, string>

export enum AuthMode {
   LOGIN,
   REGISTER
}
