/**
 * Here we use our custom hook to access required methods and flags. Then, when mounted, we provide those props to our Keyboard. We use an exclamation mark to tell the type checker that we are sure that useAudioContext() doesn’t return null. That is because we know that this component will be rendered only if the browser supports Audio API, because we tested it earlier.
 * */

import { useAudioContext } from "../AudioContextProvider";
import { useSoundfont } from "../../adapters/Soundfont";
import { useMount } from "../../utils/useMount";
import { Keyboard } from "../Keyboard";

export const KeyboardWithInstrument = () => {
    const AudioContext = useAudioContext()!
    const { loading, play, stop, load } = useSoundfont({ AudioContext })

    useMount(load)

    return <Keyboard loading={loading} play={play} stop={stop} />
}
