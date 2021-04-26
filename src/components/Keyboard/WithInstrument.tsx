/**
 * Here we use our custom hook to access required methods and flags. Then, when mounted, we provide those props to our Keyboard. We use an exclamation mark to tell the type checker that we are sure that useAudioContext() doesn’t return null. That is because we know that this component will be rendered only if the browser supports Audio API, because we tested it earlier.
 * */

import { useEffect } from "react";
import { useInstrument } from "../state/Instrument/Context";
import { useSoundfont } from "../../adapters/Soundfont/useSoundfont";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";
import { withInstrument } from "../../adapters/Soundfont/withInstrument";
import { Keyboard } from "../Keyboard/Keyboard";
import { SoundfontProvider } from "../../adapters/Soundfont/SoundfontProviderClass";

// export const KeyboardWithInstrument = () => {
//     const AudioContext = useAudioContext()!;
//     const { instrument } = useInstrument();
//     const { loading, play, stop, load } = useSoundfont({ AudioContext });
//
//     return (
//         <SoundfontProvider
//             AudioContext={AudioContext}
//             instrument={instrument}
//             render={(props) => <Keyboard {...props} />}
//         />
//     )
// }

const WrappedKeyboard = withInstrument(Keyboard);

export const KeyboardWithInstrument = () => {
    const AudioContext = useAudioContext()!;
    const { instrument } = useInstrument();
    const { loading, current, play, stop, load } = useSoundfont({ AudioContext });

    useEffect(() => {
        if (!loading && instrument !== current) load(instrument)
    }, [load, loading, current, instrument]);

    return (
        <Keyboard loading={loading} play={play} stop={stop}/>
    )
}
