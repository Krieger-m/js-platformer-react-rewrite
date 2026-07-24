import styles from './components.module.css';
export const CheckPointOverlay = (message: string, visible: boolean) =>{
    return(
        visible ? <div className={styles.checkpointScreen}>
            <h1>Congrats!</h1>
            <p>{message}</p>
        </div> : null
    )
}