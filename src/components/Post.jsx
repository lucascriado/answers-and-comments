import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'

export function Post() {
    const dateReal = '2023-05-11 08:00:12'

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src="https://github.com/lucascriado.png"/>
                    <div className={styles.authorInfo}>
                        <strong>Lucas Criado</strong>
                        <span>Full-Stack Developer</span>
                    </div>     
                </div>

                
                <time title={dateReal} dateTime={dateReal}>Publicado há 1h</time>
            </header>

            <div className={styles.content}>
                <p>Fala galeraa 👋</p>

                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>

                <p>👉<a href="#"> jane.design/doctorcarev</a></p>

                <p>
                    <a href="#"> #novoprojeto</a>
                    <a href="#"> #nlw</a>
                    <a href="#"> #rocketseat</a>
                </p>
            </div>

            <form className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea placeholder='Deixe seu comentário!'
                ></textarea>

                <footer>
                    <button type="submit">Publicar</button>
                </footer>

            </form>
            <div className={styles.commentList}>
                <Comment />
                <Comment />
                <Comment />
            </div>
        </article>
    )
}