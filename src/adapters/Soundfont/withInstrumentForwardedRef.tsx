import { Component, ComponentClass, Ref, forwardRef } from "react"
import Soundfont, {InstrumentName, Player} from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { Optional } from "../../domain/types"
import {
    AudioNodesRegistry,
    DEFAULT_INSTRUMENT
} from "../../domain/sound"

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

export function withInstrument<TProps extends InjectedProps = InjectedProps>(WrappedComponent: ComponentClass<TProps>) {
    type ComponentInstance = InstanceType<typeof WrappedComponent>;
    type WithForwardedRef = ProviderProps & { forwardedRef: Ref<ComponentInstance> };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    class WithInstrument extends Component<WithForwardedRef, ProviderState> {
        public render() {
            const { forwardedRef } = this.props
            const injected = {
                loading: this.state.loading,
                // play: this.play,
                // stop: this.stop
            } as InjectedProps

            return (
                <WrappedComponent
                    ref={forwardedRef}
                    {...(injected as TProps)}
                />
            )
        }
    }

    return forwardRef<ComponentInstance, ProviderProps>(
        (props, ref) =>
            <WithInstrument forwardedRef={ref} {...props} />
    )
}
