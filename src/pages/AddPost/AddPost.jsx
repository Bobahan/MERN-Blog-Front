import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Input } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { postsAPI, uploadAPI } from '../../API/API';
import { useAutoTextSize } from '../../utils/useAutoTextSize';
import styles from './AddPost.module.scss';

const AddPost = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [values, setValues] = React.useState({ title: '', body: '', imageUrl: '' });
  const textAreaRef = React.useRef(null);
  const isAuth = useSelector((state) => state.auth.user);

  useAutoTextSize(textAreaRef.current, values.body);

  const onChangeTitleHanlder = (title) => {
    setValues({
      ...values,
      title: title.currentTarget.value,
    });
  };

  const onChangeBodyHanlder = (body) => {
    setValues({
      ...values,
      body: body.currentTarget.value,
    });
  };

  const onChangeFileHanlder = async (img) => {
    const { data } = await uploadAPI.uploadIMG(img.target.files[0]);
    setValues({
      ...values,
      imageUrl: data.url,
    });
  };

  const onClickSend = async () => {
    const post = { title: values.title, body: values.body, imageUrl: values.imageUrl };
    const { data } = await postsAPI.addPost(post);
    const postId = data._id;
    navigate(`/post/${postId}`);
  };

  const submitEdit = async () => {
    const post = { title: values.title, body: values.body, imageUrl: values.imageUrl };
    await postsAPI.editPost(id, post);
    navigate(`/post/${id}`);
  };

  React.useEffect(() => {
    (async () => {
      if (id) {
        let { data } = await postsAPI.getOnePost(id);
        const { body, title, imageUrl } = data;
        setValues({
          ...values,
          title: title,
          body: body,
          imageUrl: imageUrl,
        });
      }
    })();
  }, []);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="container__addpost">
      <div className={styles.edit}>
        <div className={styles.edit__form}>
          {values.imageUrl && (
            <img className={styles.edit__image} src={`http://localhost:4444${values.imageUrl}`} />
          )}
          {!values.imageUrl ? (
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={onChangeFileHanlder} />
            </Button>
          ) : (
            <Button
              onClick={() => setValues((values.imageUrl = ''))}
              variant="contained"
              component="label"
              color="warning">
              Change image
            </Button>
          )}
          <div style={{ marginTop: '20px' }}>
            <h1>Title</h1>
            <Input
              required
              id="outlined-required"
              className={styles.edit__title}
              placeholder="Type title..."
              variant="standard"
              onChange={onChangeTitleHanlder}
              value={values.title}
              inputProps={{ inputMode: 'text' }}
            />
            <h2>Text</h2>
            <textarea
              ref={textAreaRef}
              placeholder="Type text..."
              className={styles.edit__body}
              onChange={onChangeBodyHanlder}
              value={values.body}
            />
            {!id ? (
              <Button
                disabled={!values.body || !values.title}
                onClick={onClickSend}
                type="submit"
                variant="contained">
                Send
              </Button>
            ) : (
              <Button onClick={submitEdit} type="submit" variant="contained">
                Save
              </Button>
            )}
            {!id && (
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
