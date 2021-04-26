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

// @ts-ignore
export function useSoundfont({ AudioContext }: Settings): Adapted {
    let activeNodes: AudioNodesRegistry = {};
    const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Optional<Player>>(null);
    const audio = useRef(new AudioContext());

    // Soundfont's instrument() is async, too
    async function load(instrument: InstrumentName = DEFAULT_INSTRUMENT) {
        setLoading(true);
        const player = await Soundfont.instrument(audio.current, instrument);
        setLoading(false);
        setCurrent(instrument);
        setPlayer(player);
    }

    async function play(note: MidiValue) {
        await resume();
        if (!player) return;

        const node = player.play(note.toString());
        activeNodes = {...activeNodes, [note]: node }
    }

    async function stop(note: MidiValue) {
        await resume();
        // This exclamation mark in the stop() function is a non-null assertion operator.
        if (!activeNodes[note]) return
        activeNodes[note]!.stop();
        activeNodes = { ...activeNodes, [note]: null };
    }

    // This function checks what state audio is in right now.
    // If it is suspended that means that AudioContext is halting audio hardware access and reducing CPU/battery usage in the process.
    // To continue we have to resume() it.
    // And since it also has an async interface we have to implement our resume() wrapper as async too.
    async function resume() {
        return audio.current.state === "suspended"
            ? await audio.current.resume()
            : Promise.resolve()
    }

    return {
        loading, current,
        load, play, stop
    }

}
