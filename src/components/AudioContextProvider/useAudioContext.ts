import { useRef } from "react";
import { Optional } from "../../domain/note";
import { accessContext } from "../../domain/audio";

export function useAudioContext(): Optional<AudioContextType> {
    const AudioCtx = useRef(accessContext());
    return AudioCtx.current;
}
