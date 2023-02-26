import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllPosts } from '../../store/slices/posts/posts';
import Post from '../Post/Post';
import { Preloader } from '../Preloader';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.user);
  const { items, isLoading } = useSelector((state) => state.posts.posts);

  React.useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  if (items.length === 0 || !items) {
    return <Preloader />;
  }

  return (
    <div className="container">
      {isLoading ? (
        <Preloader />
      ) : (
        items.map((post) => (
          <Post
            postId={post._id}
            title={post.title}
            body={post.body}
            img={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''}
            key={post._id}
            createdAt={post.createdAt}
            viewsCount={post.viewsCount}
            user={post.user.name}
            isOwner={post.user?._id === isAuth?._id}
            avatarURL={post.user.avatarURL ? `http://localhost:4444${post.user.avatarURL}` : ''}
          />
        ))
      )}
    </div>
  );
};

export default Home;
