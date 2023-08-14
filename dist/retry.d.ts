declare type Fn = () => Promise<any>;
declare type ErrorFn = (index: any, error: any) => void;
export declare const retry: (fn: Fn, times: number, errorFn?: ErrorFn, failedMessage?: string) => Promise<any>;
export {};
