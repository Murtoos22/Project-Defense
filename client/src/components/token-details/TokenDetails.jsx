import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneTokenById } from '../../hooks/useGetAllTokens';

import styles from './TokenDetails.module.css';

import Comment from './comment/Comment';
import SvgImage from '../SvgImage/SvgImage';
import TokenContext from '../../context/TokenContext';
import LeaveComment from './leave-comment/LeaveComment';
import useUserLoginCheck from '../../hooks/useUserLoginCheck';

const TokenDetails = () => {
    const { id } = useParams();
    const { isLoggedIn, navigate } = useUserLoginCheck();

    const [token, setToken] = useState({});

    const [leaveComment, setLeaveComment] = useState(false);
    const [viewComments, setViewComments] = useState(false);

    const fetchedToken = useGetOneTokenById(id);

    useEffect(() => {
        if (fetchedToken) {
            setToken(fetchedToken);
        }
    }, [fetchedToken]);

    if (!token || !token.articleContent) return <></>;

    function onViewCommentsButtonClick() {
        setViewComments(true);
    };

    function onHideCommentsButtonClick() {
        setViewComments(false);
    };

    function onLeaveCommentButtonHandler() {
        if (!isLoggedIn) navigate('/login');

        setLeaveComment(true);
    };

    function onCancelButtonClickHandler() {
        setLeaveComment(false);
    };

    function handleNewComment(newToken) {
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <div>
                <div className={styles.tokenArticleContainer}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{token.name.toUpperCase()}</h1>
                        <SvgImage name={token.name} height='45' width='45' />
                    </div>
                    <div className={styles.articleContent}>
                        <div className={styles.articleHeader}>Introduction</div>
                        <p className={styles.articleParagraph}>
                            {token.articleContent.introduction}
                        </p>
                        <div className={styles.articleHeader}>What is {token.name}?</div>
                        <p className={styles.articleParagraph}>
                            {token.articleContent.definition}
                        </p>
                        <div className={styles.articleHeader}>How does {token.name} work?</div>
                        <p className={styles.articleParagraph}>
                            {token.articleContent.methodology}
                        </p>
                        <div className={styles.articleHeader}>What makes {token.name} special?</div>
                        <p className={styles.articleParagraph}>
                            {token.articleContent.specialties}
                        </p>
                        <div className={styles.articleHeader}>How does {token.name} benefit the crypto ecosystem?</div>
                        <p className={styles.articleParagraph}>
                            {token.articleContent.benefits}
                        </p>
                    </div>
                    <div className={styles.commentOnPostContainer}>
                        <button
                            className={styles.commentOnPostButton}
                            onClick={onLeaveCommentButtonHandler}
                        >
                            Leave Comment
                        </button>
                    </div>
                </div>
                <div className={styles.commentButtonContainer}>
                    {viewComments
                        ? (
                            <button
                                onClick={onHideCommentsButtonClick}
                                className={styles.commentsButton}
                            >
                                Hide Comments
                            </button>
                        )
                        : (
                            <button
                                onClick={onViewCommentsButtonClick}
                                className={styles.commentsButton}
                            >
                                View Comments
                            </button>
                        )
                    }
                </div>
                {viewComments && token.articleContent.comments.length > 0
                    ? (
                        <div className={styles.commentsContainer}>
                            {token.articleContent.comments.map(comment => (
                                <Comment key={comment._id} comment={comment} onCommentAction={handleNewComment} />
                            ))}
                        </div>
                    )
                    : viewComments && token.articleContent.comments.length === 0
                        ? (
                            <div className={styles.noCommentsContainer}>
                                <p>There are no comments on this article</p>
                            </div>
                        )
                        : null
                }
                {leaveComment
                    ? (
                        <>
                            <LeaveComment onCommentAdded={handleNewComment} />
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
            </div>
        </TokenContext.Provider>
    );
};

export default TokenDetails;