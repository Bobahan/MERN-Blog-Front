import styles from './Post.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import userIMG from '../../assets/user.png';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Clear';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const Post = ({ _id, title, body, img, isFullPost, user, data, viewsCount }) => {
  const isEditable = true;
  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <Link to={`/post/${_id}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        <img
          className={clsx(styles.post__image, { [styles.post__imageFull]: isFullPost })}
          src={
            img ||
            'https://thecode.media/wp-content/uploads/2023/02/photo_2023-02-01_14-32-06-2-1536x1027.png'
          }
          alt={title}
        />
        <div className={clsx(styles.post__content, { [styles.post__contentFull]: isFullPost })}>
          <div className={clsx(styles.post__title, { [styles.post__titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/post/${_id}`}>{title}</Link>}
          </div>
          <div className={styles.post__body}>
            {body}{' '}
            shajhdfsshajhdfsfkhksahjkfhjksahjkshajhdfsfkhksahjkfhjksahjkshajhdfsfkhksahjkfhjksahjkshajhdfsfkhksahjkfhjksahjkshajhdfsfkhksahjkfhjksahjkshajhdfsfkhksahjkfhjksahjkshajhdfsfkhksahjkfhjksahjkfkhksahjkfhjksahjk
          </div>
          <div className={clsx(styles.post__user, { [styles.post__userFull]: isFullPost })}>
            <img src={userIMG} className={styles.post__userIMG} />
            <div>{user}</div>
            <div>{data}</div>
          </div>
          <div>
            <ul className={styles.post__details}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
              <li>
                <CommentIcon />
                <span>12</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
