import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { postedAt } from '../utils';

function ThreadDetail({
  id, title, body, category, createdAt, likes, user, authUser, likeThread,
}) {
  const isThreadLiked = likes.includes(authUser);

  return (
    <section className="thread-detail">
      <header>
        <img src={user.photo} alt={user.name} />
        <div className="thread-detail__user-info">
          <p className="thread-detail__user-name">{user.name}</p>
          <p className="thread-detail__user-id">@{user.id}</p>
        </div>
      </header>
      <article>
        <h2 className="thread-detail__title">{title}</h2>
        {category && <p className="thread-detail__category">#{category}</p>}
        <p className="thread-detail__body">{body}</p>
      </article>
      <footer>
        <div className="thread-detail__like">
          <button type="button" aria-label="like" onClick={() => likeThread(id)}>
            {isThreadLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
          </button>
          <span>
            {likes.length} Likes
          </span>
        </div>
        <p className="thread-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
  likeThread: PropTypes.func.isRequired,
};

ThreadDetail.defaultProps = {
  category: '',
};

export default ThreadDetail;
