import React from 'react';

import styles from './UserComment.module.css';

import Like from '../../token-details/comment/Like';
import Dislike from '../../token-details/comment/Dislike';
import { Link } from 'react-router-dom';

const UserComment = ({ comment }) => {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.usernameContainer}>
                <p className={styles.username}>
                    {comment.authorUsername}
                </p>
                <div className={styles.voteContainer}>
                    <Like viewBox="0 0 550 550" height="20" width="20" fill="white" />
                    <p className={styles.vote}>{comment.likes.length}</p>
                    <Dislike viewBox="0 0 550 550" height="20" width="20" fill="white" />
                    <p className={styles.vote}>{comment.dislikes.length}</p>
                </div>
            </div>
            <div className={styles.commentbodyContainer}>
                <p className={styles.commentBody}>
                    {comment.text}
                </p>
            </div>

            <div className={styles.commentOptionsContainer}>
                <Link
                    to={`/tokens/${comment.tokenId}`}
                    className={styles.commentOptionsButton}
                >
                    Go to post
                </Link>
            </div>
        </div>
    );
};

export default UserComment;