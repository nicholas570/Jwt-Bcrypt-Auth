import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/posts', {
        headers: {
          Authorization: localStorage.getItem('Token'),
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPosts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>My posts</h1>
      {posts &&
        posts.map((post) => {
          return <p key={post.id}>{post.content}</p>;
        })}
    </div>
  );
}

export default Home;
