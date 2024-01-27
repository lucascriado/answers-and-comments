import React, { useState } from 'react';
import styles from './Create.module.css';

export function CreatePost() {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      author: {
        avatarUrl: 'https://github.com/diego3g.png',
        name: author,
        role: 'CTO @Rocketseat'
      },
      content: [
        { type: 'paragraph', content: content },
      ],
      publishedAt: new Date().toISOString()
    };

    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.create}>
      <label>
        Author:
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}