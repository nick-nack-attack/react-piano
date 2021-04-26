import { FunctionComponent } from "react";
import clsx from "clsx";
import { NoteType } from "../../domain/note";
import styles from "./Key.module.css";

type PressCallback = () => void;
/**
 * type - a NoteType - will be used to define the styles of a key
 * label - a string - a letter that will be placed as a label of a key
 * disabled - an optional boolean - if true it will disable the key from being pressed
 * */
type KeyProps = {
    type: NoteType,
    label: string,
    disabled?: boolean,

    onUp: PressCallback,
    onDown: PressCallback
}

export const Key: FunctionComponent<KeyProps> = (props) => {
    return (
        <button
            className={clsx(styles.key, styles[type])}
            onMouseDown={onDown}
            onMouseUp={onUp}
            type="button"
            {...rest}
        >
            {label}
        </button>
    )
}
