import React, { useState } from 'react';

import styles from './UserComments.module.css';

import useGetUserComments from '../../hooks/useGetUserComments';
import UserComment from './user-comment/UserComment';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const UserComments = () => {
  const { loading, comments} = useGetUserComments();

  console.log(loading, comments);
  if(loading) return <Spinner />;

  return (
    <div className={styles.userCommentsContainer}>
      {comments.length > 0 && !loading
        ? (
          comments.map(comm => <UserComment key={comm._id} comment={comm} />)
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