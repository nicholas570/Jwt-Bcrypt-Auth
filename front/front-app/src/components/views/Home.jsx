import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { userContext } from '../../context/userProvider';

function Home() {
  const [posts, setPosts] = useState();
  const [result, setResult] = useState({ message: '', error: '' });
  const { userData } = useContext(userContext);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      })
      .then(({ data }) => {
        setPosts(data.data);
      })
      .catch((err) => {
        setResult({
          message: err.response.data,
          error: err.response.status,
        });
      });
  }, []);

  return (
    <div>
      <h1>Hello {userData && userData.user.firstname}</h1>
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
