export interface CallbackParams {
    delta: number;
    total: number;
}
export default function useAnimationFrame(callback: (params: CallbackParams) => void): void;
