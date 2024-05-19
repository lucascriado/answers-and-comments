import styles from './Header.module.css'
import igniteLogo from '../assets/git.svg'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={igniteLogo} className={styles.logo} alt="Logotipo do Ignite" />
            <span className={styles.title}>
                <a href="https://github.com/lucascriado">Desenvolvido por <strong>Lucas Criado</strong>
                </a>
            </span>
        </header>
        
    )
}