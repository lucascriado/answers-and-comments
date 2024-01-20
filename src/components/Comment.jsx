import styles from './Comment.module.css'
import { Trash } from 'phosphor-react'
import { ThumbsUp } from 'phosphor-react'
import { Avatar } from './Avatar'

export function Comment(){
    const dateReal = '2023-05-11 08:00:12'

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/lucascriado.png"/>  
            
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Lucas Criado</strong>
                            <time title={dateReal}>Cerca de 2 horas atrás</time>
                        </div>

                        <button title="Deletar Comentário">
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>Muito bom Devon, parabéns!! 👏👏</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button> 
                </footer>
            </div>
        </div>
    )
}