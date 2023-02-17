import { Skeleton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../store/slices/posts/posts';
import Post from '../Post/Post';

const Home = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.posts.posts);

  const isLoadingPosts = isLoading.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <>
      {(isLoadingPosts ? [...Array(5)] : items).map((post, index) =>
        isLoadingPosts ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            _id={post._id}
            title={post.title}
            body={post.body}
            img={post.img}
            key={post._id}
            user={post.user.fullName}
            data={post.createdAt}
            viewsCount={post.viewsCount}
          />
        ),
      )}
    </>
  );
};

export default Home;
