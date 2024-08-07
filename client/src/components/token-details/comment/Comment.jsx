import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Comment.module.css';

import Like from './Like';
import Dislike from './Dislike';
import EditComment from './edit-comment/EditComment';
import TokenContext from '../../../context/TokenContext';
import useUserOwnerCheck from '../../../hooks/useUserOwnerCheck';
import useUserLoginCheck from '../../../hooks/useUserLoginCheck';

import { dislikeComment, likeComment, deleteComment } from '../../../api/token-api';

const Comment = ({ comment }) => {
    const { id } = useParams();
    const { isLoggedIn } = useUserLoginCheck();
    const { setToken } = useContext(TokenContext);

    const [edit, setEdit] = useState(false);
    const [likes, setLikes] = useState(comment.likes.length);
    const [dislikes, setDislikes] = useState(comment.dislikes.length);

    const owner = useUserOwnerCheck(comment);

    const onLikeButtonClickHandler = async () => {
        try {
            const comm = await likeComment(comment, id);
            setLikes(comm.likes.length);
            setDislikes(comm.dislikes.length);
        } catch (error) {
            console.error(error.message);
        };
    };

    const onDislikeButtonClickHandler = async () => {
        try {
            const comm = await dislikeComment(comment, id);
            setLikes(comm.likes.length);
            setDislikes(comm.dislikes.length);
        } catch (error) {
            console.error(error.message);
        };
    };

    const onEditButtonClickHandler = async () => {
        setEdit(true);
    };

    const onCancelButtonClickHandler = () => {
        setEdit(false);
    };

    const onEditSubmitted = (newToken) => {
        setEdit(false);

        setToken(newToken);
    };

    const onDeleteButtonClickHandler = async () => {
        const newToken = await deleteComment(comment._id.toString(), id);

        setToken(newToken);
    };

    return (
        <>
            <div className={styles.commentContainer}>
                <div className={styles.usernameContainer}>
                    <p className={styles.username}>
                        {comment.authorUsername}
                    </p>
                    <div className={styles.voteContainer}>
                        <Like viewBox="0 0 550 550" height="20" width="20" fill="white" />
                        <p className={styles.vote}>{likes}</p>
                        <Dislike viewBox="0 0 550 550" height="20" width="20" fill="white" />
                        <p className={styles.vote}>{dislikes}</p>
                    </div>
                </div>
                <div className={styles.commentbodyContainer}>
                    <p className={styles.commentBody}>
                        {comment.text}
                    </p>
                </div>

                <div className={styles.commentOptionsContainer}>
                    {isLoggedIn
                        ? (
                            owner
                                ? (
                                    <>
                                        <div className={styles.commentOptionsButtonContainer}>
                                            <button
                                                className={styles.commentOptionsButton}
                                                onClick={onEditButtonClickHandler}
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
                                            <button
                                                className={styles.commentOptionsButton}
                                                onClick={onLikeButtonClickHandler}
                                            >
                                                Like
                                            </button>
                                        </div>
                                        <div className={styles.commentOptionsButtonContainer}>
                                            <button
                                                className={styles.commentOptionsButton}
                                                onClick={onDislikeButtonClickHandler}
                                            >
                                                Dislike
                                            </button>
                                        </div>
                                    </>
                                )
                        )
                        : null
                    }
                </div>
            </div>
            {edit
                ? (
                    <>
                        <EditComment comment={comment} onEdit={onEditSubmitted} />
                        <div className={styles.cancelCommentContainer}>
                            <button
                                className={styles.cancelCommentButton}
                                onClick={onCancelButtonClickHandler}
                            >
                                X
                            </button>
                        </div>
                    </>
                )
                : null
            }
        </>
    );
};

export default Comment;