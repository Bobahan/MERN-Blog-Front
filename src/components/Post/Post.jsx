import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Clear';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import styles from './Post.module.scss';
import userIMG from '../../assets/userimg.png';
import { cut } from '../../utils/cutter';
import { fetchDeletePost } from '../../store/slices/posts/posts';
import noIMG from '../../assets/noimage.png';

const Post = ({
  postId,
  title,
  body,
  img,
  user,
  createdAt,
  viewsCount,
  isFullPost,
  isOwner,
  avatarURL,
}) => {
  const dispatch = useDispatch();

  const onHandleDeletePost = () => {
    dispatch(fetchDeletePost(postId));
  };

  return (
    <div className="container">
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isOwner && (
          <div className={styles.editButtons}>
            <Link to={`/post/${postId}/edit`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onHandleDeletePost}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        {img ? (
          <img
            className={clsx(styles.post__image, { [styles.post__imageFull]: isFullPost })}
            src={img}
          />
        ) : (
          <img
            src={noIMG}
            className={clsx(styles.post__image, { [styles.post__imageFull]: isFullPost })}
          />
        )}
        <div className={clsx(styles.post__content, { [styles.post__contentFull]: isFullPost })}>
          <div className={clsx(styles.post__title, { [styles.post__titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/post/${postId}`}>{title}</Link>}
          </div>
          <div className={clsx(styles.post__body, { [styles.post__bodyFull]: isFullPost })}>
            {body}
          </div>
          {!isFullPost && (
            <>
              <div className={clsx(styles.post__user, { [styles.post__userFull]: isFullPost })}>
                {avatarURL ? (
                  <img
                    style={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                    }}
                    src={`${avatarURL}`}
                  />
                ) : (
                  <img src={userIMG} className={styles.post__userIMG} />
                )}
                <div>{user}</div>
              </div>
              <ul className={styles.post__details}>
                <li>
                  <AccessTimeIcon />
                  {cut(createdAt)}
                </li>
              </ul>
              <ul className={styles.post__details}>
                <li>
                  <EyeIcon />
                  <span>{viewsCount}</span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
