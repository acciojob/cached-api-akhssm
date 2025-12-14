import React, { useEffect, useState, useMemo } from "react";
import "../styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [userId]);

  const memoizedPosts = useMemo(() => {
    console.log("Memoizing posts");
    return posts;
  }, [posts]);

  return (
    <div className="app">
      <h1>Cached API Example</h1>

      <div className="controls">
        <label>User ID: </label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="posts">
          {memoizedPosts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
