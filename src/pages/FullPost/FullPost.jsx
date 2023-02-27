import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postsAPI } from '../../API/API';
import Post from '../../components/Post/Post';
import { Preloader } from '../../components/Preloader';

const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [isFullPost] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await postsAPI.getOnePost(id);
      setPost(data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Post
      _id={post._id}
      title={post.title}
      body={post.body}
      img={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''}
      createdAt={post.createdAt}
      viewsCount={post.viewsCount}
      isFullPost={isFullPost}
    />
  );
};

export default FullPost;
