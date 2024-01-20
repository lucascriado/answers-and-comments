import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'
import { PencilLine } from 'phosphor-react'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover}
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=100&w=704&h=80&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            
            <div className={styles.profile}>
                <Avatar src="https://github.com/lucascriado.png"/>

                <strong>Lucas Criado</strong>
                <span>Full-Stack Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}