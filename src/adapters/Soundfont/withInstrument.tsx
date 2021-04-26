import { Component, ComponentType } from "react"
import Soundfont, { InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { Optional } from "../../domain/types"
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound"
import { useAudioContext } from "../../components/AudioContextProvider/useAudioContext";
import { useInstrument } from "../../components/state/Instrument/Context";
import { Keyboard } from "../../components/Keyboard/Keyboard";

type InjectedProps = {
    loading: boolean
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
    AudioContext: AudioContextType
    instrument: InstrumentName
}

type ProviderState = {
    loading: boolean
    current: Optional<InstrumentName>
}

export function withInstrument<TProps extends InjectedProps = InjectedProps>(WrappedComponent: ComponentType<TProps>) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

        return class WithInstrument extends Component<ProviderProps, ProviderState> {
            public static displayName = `withInstrument(${displayName})`;

            public render() {
                const injected = {
                    loading: this.state.loading,
                    // play: this.play,
                    // stop: this.stop
                } as InjectedProps;

                return <WrappedComponent { ...(injected as TProps) } />
            }
        }
}
