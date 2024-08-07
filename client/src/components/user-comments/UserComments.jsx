import React, { useState } from 'react';

import styles from './UserComments.module.css';

import useGetUserComments from '../../hooks/useGetUserComments';
import UserComment from './user-comment/UserComment';
import { Link } from 'react-router-dom';

const UserComments = () => {
  const comments = useGetUserComments();
  const [_, setState] = useState(false);

  const renderFunc = () => {
    setState(true);
  };

  return (
    <div className={styles.userCommentsContainer}>
      {comments.length > 0
        ? (
          comments.map(comm => <UserComment key={comm._id} comment={comm} onEdit={renderFunc} />)
        )
        : (
          <>
            <div className={styles.noCommentContainer}>
              <p className={styles.noCommentText}>
                You haven't posted any comments yet
              </p>
            </div>
            <div className={styles.noCommentLinkContainer}>
              <Link
                to={'/tokens'}
                className={styles.noCommentLink}>
                Explore Tokens
              </Link>
            </div>
          </>
        )
      }
    </div>
  );
};

export default UserComments;