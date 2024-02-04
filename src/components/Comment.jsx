import React from 'react';
import { Trash } from 'phosphor-react';
import { ThumbsUp } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export function Comment({ author, content, timestamp }) {
  const dateReal = new Date(timestamp).toLocaleString('pt-BR');

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.github} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time title={dateReal}>{/* Exibir a diferença de tempo aqui */}</time>
            </div>

            <button title="Deletar Comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
