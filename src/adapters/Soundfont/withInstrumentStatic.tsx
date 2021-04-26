import { DEFAULT_INSTRUMENT } from "../../domain/sound";
import { InstrumentName } from "soundfont-player";
import { Keyboard } from "../../components/Keyboard/Keyboard";
import { Component, ComponentType } from "react";
import {MidiValue} from "../../domain/note";
import {Optional} from "../../domain/types";
import {useAudioContext} from "../../components/AudioContextProvider/useAudioContext";

type InjectedProps = {
    loading: boolean
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
    AudioContext: AudioContextType
    instrument?: InstrumentName
}

type ProviderState = {
    loading: boolean
    current: Optional<InstrumentName>
}

export function withInstrumentStatic<TProps extends InjectedProps = InjectedProps>(initialInstrument: InstrumentName = DEFAULT_INSTRUMENT) {
        const withGuitar = withInstrumentStatic("acoustic_guitar_steel")
        const withPiano = withInstrumentStatic("acoustic_grand_piano")
        const WrappedKeyboard = withPiano(Keyboard)

    return function enhanceComponent(WrappedComponent: ComponentType<TProps>) {
            const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

            return class withInstrument extends Component<ProviderProps, ProviderState> {

            }
    }
}

