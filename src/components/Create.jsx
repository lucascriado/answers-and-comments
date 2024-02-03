import React, { useState } from 'react';
import styles from './Create.module.css';
import { User, GithubLogo, Buildings, ChatsCircle } from 'phosphor-react';
import { useHistory } from 'react-router-dom';

export function CreatePost() {
  const [authorName, setAuthor] = useState('');
  const [authorLink, setLink] = useState('');
  const [authorRole, setRole] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      author: {
        avatarUrl: 'https://github.com/' + authorLink + '.png',
        name: authorName,
        role: authorRole
      },
      content: [
        { type: 'paragraph', content: content },
      ],
      publishedAt: new Date().toISOString(),
      comments: []
    };

    fetch('https://lucascriado.com:3030/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(response => response.json())
    .then(() => {
      history.push('/');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <label className={styles.inputGroup}>
        <User size={20} />
        <input type="text" value={authorName} placeholder='Qual seu nome?' onChange={e => setAuthor(e.target.value)} />
      </label>
      <label className={styles.inputGroup}>
        <GithubLogo size={20} />
        <input type="text" value={authorLink} placeholder='Seu usuário no Github!' onChange={e => setLink(e.target.value)} />
      </label>
      <label className={styles.inputGroup}>
        <Buildings size={20} />
        <input type="text" value={authorRole} placeholder='Qual sua profissão?' onChange={e => setRole(e.target.value)} />
      </label>
      <label className={styles.inputGroup}>
        <ChatsCircle size={20} />
        <textarea type="text" value={content} placeholder='O que deseja publicar hoje?' onChange={e => setContent(e.target.value)} />
      </label>
      <label className={styles.inputGroup}>
        <div style={{ opacity: 0 }}>
            <ChatsCircle size={20} />
          </div>
          <input type="submit" value="Submit" />
      </label>  
    </form>
  );
}