import {InstrumentName, Player} from "soundfont-player";
import { MidiValue } from "./note";
import { Optional } from "./types";

export const DEFAULT_INSTRUMENT: InstrumentName = "acoustic_grand_piano";

/*
* AudioNodesRegistry is a Record of MidiValue as a key and a Player as a value.
* Player type is a type provided by Soundfont, and it is basically an entity that handles for us every musical operation that we want to perform.
 */
export type AudioNodesRegistry = Record<MidiValue, Optional<Player>>;
