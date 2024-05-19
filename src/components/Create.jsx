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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2014%2014%22%20height%3D%2214%22%20width%3D%2214%22%3E%3Cg%20id%3D%22user-single-neutral--close-geometric-human-person-single-up-user%22%3E%3Cpath%20id%3D%22Union%22%20fill%3D%22%23ffffff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M10.406%203.781c0%202.18%20-1.226%203.406%20-3.406%203.406S3.594%205.962%203.594%203.781%204.82%200.375%207%200.375s3.406%201.226%203.406%203.406Zm-9.232%206.325A10.456%2010.456%200%200%201%207%208.344c2.154%200%204.159%200.649%205.826%201.762%200.42%200.281%200.7%200.652%200.82%201.07%200.12%200.414%200.075%200.839%20-0.09%201.212%20-0.329%200.744%20-1.128%201.29%20-2.12%201.29H2.565c-0.992%200%20-1.791%20-0.546%20-2.12%20-1.29a1.768%201.768%200%200%201%20-0.09%20-1.213c0.12%20-0.417%200.4%20-0.788%200.82%20-1.069Z%22%20clip-rule%3D%22evenodd%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        img.src = url;
      });

    const post = {
      author: {
        avatarUrl: await checkImage('https://github.com/' + authorLink + '.png'),
        name: authorName,
        role: authorRole
      },
      content: [
        { type: 'paragraph', content: content },
      ],
      publishedAt: new Date().toISOString(),
      comments: []
    };

    fetch('https://localhost:3030/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(response => response.json())
    .then(() => {
      console.log('Post criado com sucesso!');
      window.location.href = '/';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <label className={styles.inputGroup}>
        <User size={20} />
        <input type="text" value={authorName} placeholder='Qual seu nome?' onChange={e => setAuthor(e.target.value)} required />
      </label>
      <label className={styles.inputGroup}>
        <GithubLogo size={20} />
        <input type="text" value={authorLink} placeholder='Seu usuário no Github!' onChange={e => setLink(e.target.value)} required />
      </label>
      <label className={styles.inputGroup}>
        <Buildings size={20} />
        <input type="text" value={authorRole} placeholder='Qual sua profissão?' onChange={e => setRole(e.target.value)} required />
      </label>
      <label className={styles.inputGroup}>
        <ChatsCircle size={20} />
        <textarea type="text" value={content} placeholder='O que deseja publicar hoje?' onChange={e => setContent(e.target.value)} required />
      </label>
      <label className={styles.inputGroup}>
        <div style={{ opacity: 0 }}>
            <ChatsCircle size={20} />
          </div>
          <input type="submit" value="Publicar!" />
      </label>  
    </form>
  );
}