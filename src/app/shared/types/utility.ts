export type EmitHandler<T extends any[]> = (...args: T) => void | Promise<void>;
export type StoreActions = Record<string, (...args: any[]) => any>
