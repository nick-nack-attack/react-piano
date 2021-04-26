import { FunctionComponent } from "react";
import clsx from "clsx";
import { NoteType } from "../../domain/note";
import styles from "./Key.module.css";
import { usePressObserver } from "../PressObserver/usePressObserver";

type PressCallback = () => void;
/**
 * type - a NoteType - will be used to define the styles of a key
 * label - a string - a letter that will be placed as a label of a key
 * disabled - an optional boolean - if true it will disable the key from being pressed
 * */
type KeyProps = {
    type: NoteType
    label: string
    disabled?: boolean

    onUp: PressCallback
    onDown: PressCallback
}

export const Key: FunctionComponent<KeyProps> = (props) => {
    const { type, label, onUp, onDown, ...rest } = props;

    const pressed = usePressObserver({
        watchKey: label,
        onStartPress: onDown,
        onFinishPress: onUp
    })
    return (
        <button
            className={clsx(
                styles.key,
                styles[type],
                pressed && "is-pressed"
            )}
            onMouseDown={onDown}
            onMouseUp={onUp}
            type="button"
            {...rest}
        >
            {label}
        </button>
    )
}
