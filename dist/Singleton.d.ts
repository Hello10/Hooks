export interface SingletonOptions<TState> {
    state?: Partial<TState> | (() => Partial<TState>);
}
export declare class Singleton<TState, TOptions extends SingletonOptions<TState>> {
    private static instance;
    protected state: TState;
    protected options: TOptions;
    protected listeners: ((state: TState) => void)[];
    static use<TState, TOptions extends SingletonOptions<TState>, TSingleton extends Singleton<TState, TOptions>>(options: TOptions): TSingleton;
    constructor(options: TOptions);
    protected initialize(state: Partial<TState>): TState;
    protected setState(state: Partial<TState>): void;
    private addListener;
    private removeListener;
}
export default Singleton;
