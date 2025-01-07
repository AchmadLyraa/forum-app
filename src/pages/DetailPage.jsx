import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import { asyncAddComment } from '../states/comments/action';

function DetailPage() {
  const { id } = useParams();
  const {
    threads = [],
    users = [],
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);

  const [combinedThread, setCombinedThread] = useState(null);
  const [commentContent, setCommentContent] = useState(' ');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    return;
  }, [commentContent]);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  // const onReplyThread = (content) => {
  //   dispatch(asyncAddComment(id, { content }));
  // };

  // console.log(threads)
  // console.log(id)


  // Menggabungkan threadh dan threadDetail ketika data sudah ada
  useEffect(() => {
    if (threadDetail && threads.length > 0 && users.length > 0) {
      const threadh = threads
        .filter((thread) => thread.id === id)
        .map((thread) => ({
          ...thread,
          user: users.find((user) => user.id === thread.ownerId),
          authUser: authUser.id,
        }))[0];

      const combined = {
        ...threadh,
        ...threadDetail, // threadDetail akan menggantikan nilai yang sama dari threadh
      };
      setCombinedThread(combined); // Set combinedThread ke state
    }
  }, [threadDetail, threads, users, id, authUser]);

  if (!combinedThread) {
    return <p>Loading...</p>; // Menunggu data tersedia sebelum menampilkan
  }

  const onAddComment = (e) => {
    e.preventDefault();
    if (commentContent.trim()) {
      dispatch(asyncAddComment(id, { content: commentContent }));
      setCommentContent('');
    }
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <div className="detail-page__parent">
        <h3>Replying To</h3><br />
        <ThreadItem {...combinedThread} authUser={authUser} />
        {/* Kolom Komentar */}
        <div className="comments-section">
          <h4>Comments</h4>
          {combinedThread.comments.length > 0 ? (
            combinedThread.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-author">
                  <img
                    src={comment.owner.avatar}
                    alt={comment.owner.name}
                    className="comment-avatar"
                  />
                  <h5>{comment.owner.name}</h5>
                </div>
                <p dangerouslySetInnerHTML={{ __html: comment.content }} />
                <p className="comment-time">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p> // Menampilkan jika tidak ada komentar
          )}
        </div>
        <form onSubmit={onAddComment}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>

    </section>
  );
}

export default DetailPage;
