import React, { useState } from 'react';
import styles from './Comment.module.css';
import { dislikeComment, likeComment, appendReply, deleteComment } from '../../../api/token-api';
import { useParams } from 'react-router-dom';

import useUserOwnerCheck from '../../../hooks/useUserOwnerCheck';

const Comment = ({ comment, onCommentAction }) => {
    const { id } = useParams();

    const [likes, setLikes] = useState(comment.likes.length);
    const [dislikes, setDislikes] = useState(comment.dislikes.length);

    const owner = useUserOwnerCheck(comment);

    const onViewRepliesButtonClick = () => {
        setViewReplies(true);
    };

    const onLikeButtonClickHandler = async() => {
        try {
            const comm = await likeComment(comment, id);
            setLikes(comm.likes.length)
        } catch (error) {
            console.error(error.message);
        };
    };

    const onDislikeButtonClickHandler = async() => {
        try {
            const comm = await dislikeComment(comment, id);
            setDislikes(comm.dislikes.length)
        } catch (error) {
            console.error(error.message);
        };
    };

    const onEditButtonClickHandler = async() => {
        
    };

    const onDeleteButtonClickHandler = async() => {
        const newToken = await deleteComment(comment._id.toString(), id);
        console.log(newToken);
        
        onCommentAction(newToken);
    };

    return (
        <div className={styles.commentContainer}>
            <div className={styles.usernameContainer}>
                <p className={styles.username}>
                    {comment.authorUsername}
                </p>
            </div>
            <div className={styles.commentbodyContainer}>
                <p className={styles.commentBody}>
                    {comment.text}
                </p>
            </div>

            <div className={styles.commentOptionsContainer}>
                {owner
                    ? (
                        <>
                            <div className={styles.commentOptionsButtonContainer}>
                                <button
                                    className={styles.commentOptionsButton}
                                    onClick={onLikeButtonClickHandler}
                                >
                                    Edit
                                </button>
                            </div>
                            <div className={styles.commentOptionsButtonContainer}>
                                <button
                                    className={styles.commentOptionsButton}
                                    onClick={onDeleteButtonClickHandler}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div className={styles.commentOptionsButtonContainer}>
                                <p>{likes}</p>
                                <button
                                    className={styles.commentOptionsButton}
                                    onClick={onLikeButtonClickHandler}
                                >
                                    Like
                                </button>
                            </div>
                            <div className={styles.commentOptionsButtonContainer}>
                                <p>{dislikes}</p>
                                <button
                                    className={styles.commentOptionsButton}
                                    onClick={onDislikeButtonClickHandler}
                                >
                                    Dislike
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
            {comment.replies.length > 0
                ? (
                    <button
                        className={styles.viewRepliesButton}
                        onClick={onViewRepliesButtonClick}
                    >
                        view replies
                    </button>
                )
                : null
            }
        </div>
    );
};

export default Comment;