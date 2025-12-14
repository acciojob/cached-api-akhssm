import React, { useEffect, useState, useMemo } from "react";
import "../styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <div className="page">
      <div className="container">
        <h2>Cached API</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          memoizedPosts.map((post) => (
            <div className="card" key={post.id}>
              {/* 🔥 Cypress checks this EXACT tag */}
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
