import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

import { userContext } from '../../context/userProvider';

function Home() {
  const [posts, setPosts] = useState();
  const [result, setResult] = useState({ message: '', error: '' });
  const { userData } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    axiosInstance(history)
      .get('api/posts')
      .then(({ data }) => {
        setPosts(data.data);
      })
      .catch((err) => {
        if (err.response) {
          setResult({
            message: err.response.data,
            error: err.response.status,
          });
        }
      });
  }, [history]);

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
