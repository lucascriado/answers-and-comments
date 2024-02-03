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

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: comments.length + 1,
      postId: currentPostId,
      author: {
        name: commentAuthor,
        github: 'https://github.com/' + commentGithub + '.png',
      },
      content: commentContent,
      publishedAt: new Date().toISOString(),
    };

    fetch(`https://lucascriado.com:3030/posts/${currentPostId}`)
      .then(response => response.json())
      .then(post => {
        post.comments = Array.isArray(post.comments) ? [...post.comments, newComment] : [newComment];
        return fetch(`https://lucascriado.com:3030/posts/${currentPostId}`, {
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
        history.push('/');
      })
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
            onChange={(e) => setCommentAuthor(e.target.value)}
          />
        </label>
        <label className={styles.inputGroup}>
          <GithubLogo size={20} />
          <input
            type="text"
            placeholder="Seu usuário no Github!"
            value={commentGithub}
            onChange={(e) => setCommentGithub(e.target.value)}
          />
        </label>
        <label className={styles.inputGroup}>
          <Chat size={20} />
          <textarea
            placeholder="Deixe seu comentário"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
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