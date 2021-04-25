export type NoteType = "natural" | "flat" | "sharp";
export type NotePitch = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type OctaveIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type MidiValue = number;
export type PitchIndex = number;

/**
 * midi - of type MidiValue - a number in Octave Notation
 * type - of type NoteType - which note it is: natural or sharp
 * pitch - of type NotePitch - a literal representation of a note’s pitch
 * index - of type PitchIndex - an index of notes in an octave”
 * octave - of type OctaveIndex - an octave index of a given note
 */
export type Note = {
    midi: MidiValue;
    type: NoteType;

    pitch: NotePitch;
    index: PitchIndex;
    octave: OctaveIndex;
}
