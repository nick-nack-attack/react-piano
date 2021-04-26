import { useState, useRef } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { Optional } from "../../domain/types";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound";

/**
 * Here, a Settings type describes what our useSoundfont() adapter hook requires as arguments.
 * In our case, we want an AudioContext constructor.
 * Then the Adapted interface specifies what kind of object we’re going to return from our hook.
 * */
type Settings = {
    AudioContext: AudioContextType
}

interface Adapted {
    loading: boolean
    current: Optional<InstrumentName>

    load(instrument?: InstrumentName): Promise<void>
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

export function useSoundfont({ AudioContext }: Settings): Adapted {
    let activeNodes: AudioNodesRegistry = {};
    const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Optional<Player>>(null);
    const audio = useRef(new AudioContext());
}
