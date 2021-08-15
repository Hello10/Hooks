export declare type SingletonOptions<State> = {
    state?: Partial<State> | (() => Partial<State>);
    [k: string]: unknown;
};
export declare class Singleton<State> {
    private static instance;
    protected state: State;
    protected options: SingletonOptions<State>;
    protected listeners: ((state: State) => void)[];
    static use<State>(options?: SingletonOptions<State>): Singleton<State>;
    constructor(options?: SingletonOptions<State>);
    initialize(state: Partial<State>): State;
    setState(state: Partial<State>): void;
    addListener(listener: (state: any) => void): void;
    removeListener(listener: (state: any) => void): void;
}
export default Singleton;
