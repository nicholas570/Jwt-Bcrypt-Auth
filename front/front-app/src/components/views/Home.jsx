import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState();
  const [result, setResult] = useState({ message: '', error: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/posts')
      .then(({ data }) => {
        setPosts(data.data);
      })
      .catch((err) => {
        console.log(err.response);
        setResult({
          message: err.response.data,
          error: err.response.status,
        });
      });
  }, []);

  return (
    <div>
      <h1>My posts</h1>
      {result && (
        <>
          <p>{result.message}</p>
          <p>{result.error}</p>
        </>
      )}
      {posts &&
        posts.map((post) => {
          return <p key={post.id}>{post.content}</p>;
        })}
    </div>
  );
}

export default Home;
