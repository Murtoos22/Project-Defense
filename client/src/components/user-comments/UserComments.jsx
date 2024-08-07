import React, { useState } from 'react';

import styles from './UserComments.module.css';

import useGetUserComments from '../../hooks/useGetUserComments';
import UserComment from './user-comment/UserComment';

const UserComments = () => {
    const comments = useGetUserComments();
    const [state, setState] = useState(false);
    console.log(comments);
    console.log('comp render');
    
    const somefunc = () => {
      setState(true);
    };

  return (
    <div className={styles.userCommentsContainer}>
      {comments.map(comm => <UserComment key={comm._id} comment={comm} onEdit={somefunc}/>)}
    </div>
  );
};

export default UserComments;