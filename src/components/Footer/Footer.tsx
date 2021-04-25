import styles from "./Footer.module.css";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <span>Music Piano {currentYear}</span>
        </footer>
    )
}
