export declare const FORMAT_CONTENT_TYPE: Map<string, string>;
export declare class Service {
    private ws;
    private executorMap;
    private bufferMap;
    private timer;
    constructor();
    private connect;
    convert(ssml: string, format: string): Promise<unknown>;
}
export declare const service: Service;
