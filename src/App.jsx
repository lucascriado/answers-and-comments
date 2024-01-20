import { Post } from './components/Post.jsx'
import { Header } from './components/Header.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { posts } from './json/json.js'

import './global.css'
import styles from './App.module.css'

// author : {avatar_url: "", name: "", role: ""}
// publishedAt : Date
// content : String 

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />  
            )
          })}
        </main>
      </div>
    </div>  
    
  )
}

