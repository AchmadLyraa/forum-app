import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function addThreadHandler() {
    if (title.trim() && body.trim()) {
      addThread({ title, body, category });
      setTitle('');
      setBody('');
      setCategory('');
    }
  }

  return (
    <div className="thread-input">
      <input
        type="text"
        placeholder="Thread Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        placeholder="Write your thread..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <p className="thread-input__char-left">
        <strong>{body.length}</strong>/1000
      </p>
      <button type="submit" onClick={addThreadHandler}>
        Post Thread
      </button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
