import React from 'react';
import PropTypes from 'prop-types';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, body, createdAt, upVotesBy, totalComments, user, authUser, vote,
}) {
  const navigate = useNavigate();
  const isThreadLiked = (upVotesBy || []).includes(authUser);

  // console.log(isThreadDisliked);
  // console.log(isThreadLiked);

  const onVoteClick = (event) => {
    event.stopPropagation();
    vote(id, isThreadLiked ? 'neutral' : 'up');
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div role="button" tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
      <div className="thread-item__user-photo">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="thread-item__detail">
        <header>
          <div className="thread-item__user-info">
            <p className="thread-item__user-name">{user.name}</p>
            <p className="thread-item__user-id">@{user.id}</p>
          </div>
          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="thread-item__title">{title}</p>
          <p className="thread-item__body">{body}</p>
        </article>
        <footer>
          <div className="thread-item__votes">
            <button type="button" aria-label="like" onClick={onVoteClick}>
              {isThreadLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
            </button>
            <span>{upVotesBy.length}</span>
          </div>
          <p className="thread-item__comments">{totalComments} Comments</p>
        </footer>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.object.isRequired,
  vote: PropTypes.func,
};

ThreadItem.defaultProps = {
  vote: null,
};

export default ThreadItem;
