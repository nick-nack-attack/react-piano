import { withInstrumentStatic } from "./withInstrumentStatic";
import { Keyboard } from "../../components/Keyboard/Keyboard";
import { useAudioContext } from "../../components/AudioContextProvider/useAudioContext";


const withGuitar = withInstrumentStatic("acoustic_guitar_steel")
const withPiano = withInstrumentStatic("acoustic_grand_piano")
const WrappedKeyboard = withPiano(Keyboard)

export const KeyboardWithInstrument = () => {
    const AudioContext = useAudioContext()!
    return <WrappedKeyboard AudioContext={AudioContext} />
}
