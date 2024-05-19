import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Comment } from './Comment';
import { Avatar } from './Avatar'

import { User, GithubLogo, Chat } from 'phosphor-react';
import styles from './Post.module.css';

export function Post({ author, publishedAt, content, postId }) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentGithub, setCommentGithub] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(postId);
  const history = useHistory();

  // Adicione este hook useEffect
  useEffect(() => {
    fetch(`https://lucascriado.com:3030/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        setComments(post.comments || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar os comentários:', error);
      });
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const checkImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2014%2014%22%20height%3D%2214%22%20width%3D%2214%22%3E%3Cg%20id%3D%22user-square-single--square-geometric-human-person-single-user%22%3E%3Cpath%20id%3D%22Subtract%22%20fill%3D%22%2300875f%22%20fill-rule%3D%22evenodd%22%20d%3D%22M7%200C5.837%200%204.706%200.106%203.63%200.226A3.882%203.882%200%200%200%200.214%203.652C0.1%204.722%200%205.846%200%207s0.1%202.278%200.214%203.348a3.882%203.882%200%200%200%203.416%203.426C4.706%2013.894%205.837%2014%207%2014c1.163%200%202.294%20-0.106%203.37%20-0.226a3.882%203.882%200%200%200%203.416%20-3.426C13.9%209.278%2014%208.154%2014%207s-0.1%20-2.278%20-0.214%20-3.348A3.882%203.882%200%200%200%2010.37%200.226C9.294%200.106%208.163%200%207%200Zm0%207.7c1.58%200%202.467%20-0.89%202.467%20-2.468%200%20-1.58%20-0.888%20-2.468%20-2.467%20-2.468%20-1.579%200%20-2.467%200.889%20-2.467%202.468S5.42%207.699%207%207.699Zm2.776%202.16a4.362%204.362%200%200%201%201.405%202.083c-0.29%200.18%20-0.623%200.3%20-0.977%200.34%20-1.063%200.119%20-2.127%200.217%20-3.204%200.217%20-1.077%200%20-2.141%20-0.098%20-3.204%20-0.217a2.34%202.34%200%200%201%20-0.952%20-0.324c0.265%20-0.809%200.765%20-1.57%201.412%20-2.1a4.361%204.361%200%200%201%205.52%200Z%22%20clip-rule%3D%22evenodd%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        img.src = url;
      });

    const newComment = {
      id: comments.length + 1,
      postId: currentPostId,
      author: {
        name: commentAuthor,
        github: await checkImage('https://github.com/' + commentGithub + '.png'),
      },
      content: commentContent,
      publishedAt: new Date().toISOString(),
    };

    fetch(`https://lucascriado.com:9003/posts/${currentPostId}`)
      .then(response => response.json())
      .then(post => {
        post.comments = Array.isArray(post.comments) ? [...post.comments, newComment] : [newComment];
        return fetch(`https://lucascriado.com:9003/posts/${currentPostId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
      })
      .then(response => response.json())
      .then(data => {
        setComments([...comments, newComment]);
        setCommentAuthor('');
        setCommentGithub('');
        setCommentContent('');
      })
      .then(() => {
        console.log('Comentário publicado com sucesso!')
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erro ao publicar o comentário:', error);
      });
  };

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const publishedDate = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDate}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line, index) => {
          if (line.type === 'paragraph') {
            return <p key={index}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <a key={index} href="#">
                <p>{line.content}</p>
              </a>
            );
          }
          return null;
        })}
      </div>

      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <strong>Escreva seu comentário!</strong>
        <label className={styles.inputGroup}>
          <User size={20} />
          <input
            type="text"
            placeholder="Qual seu nome?"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)} required
          />
        </label>
        <label className={styles.inputGroup}>
          <GithubLogo size={20} />
          <input
            type="text"
            placeholder="Seu usuário no Github!"
            value={commentGithub}
            onChange={(e) => setCommentGithub(e.target.value)} required
          />
        </label>
        <label className={styles.inputGroup}>
          <Chat size={20} />
          <textarea
            placeholder="Deixe seu comentário"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)} required
          ></textarea>
        </label>
        <footer className={styles.inputGroup}>
          <div style={{ opacity: 0 }}>
            <Chat size={20} />
          </div>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment key={comment.id} author={comment.author} content={comment.content} timestamp={comment.publishedAt} />
          );
        })}
      </div>
    </article>
  );
}