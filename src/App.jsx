import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Post } from './components/Post.jsx';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { CreatePost } from './components/Create.jsx';

import './global.css';
import styles from './App.module.css';

export function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://lucascriado:3030/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <Router>
      <div>
        <Header />

        <div className={styles.wrapper}>
          <Sidebar />
          <main>
            <Switch>
              <Route path="/create">
                <CreatePost />
              </Route>
              <Route path="/">
                {posts.map(post => (
                  <Post 
                    key={post.id}
                    author={post.author}
                    content={post.content}
                    publishedAt={new Date(post.publishedAt)}
                    postId={post.id}
                  />  
                ))}
              </Route>
            </Switch>
          </main>
        </div>
      </div>  
    </Router>
  );
}
