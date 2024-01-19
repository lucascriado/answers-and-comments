import styles from './Sidebar.module.css'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.sidebar}
            src="https://images.unsplash.com/photo-1553307236-8783cc0a3b9e?q=100&w=500&h=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            
            <div className={styles.profile}>
                <strong>Lucas Criado</strong>
                <span>Full-Stack Developer</span>
            </div>

            <footer>
                <a href="#">
                    Editar perfil
                </a>
            </footer>
        </aside>
    )
}