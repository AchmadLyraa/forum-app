import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, like, authUser }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          like={like}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  vote: PropTypes.func,
  authUser: PropTypes.object,
  threads: PropTypes.array.isRequired,  // Add validation for threads
  like: PropTypes.func.isRequired,      // Add validation for like
};

export default ThreadList;
