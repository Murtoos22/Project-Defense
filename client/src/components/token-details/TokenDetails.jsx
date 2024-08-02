import React, { useState } from 'react';

import styles from './TokenDetails.module.css';

import { useParams } from 'react-router-dom';
import { useGetOneTokenById } from '../../hooks/useGetAllTokens';

import Comment from './comment/Comment';
import SvgImage from '../SvgImage/SvgImage';

const TokenDetails = () => {

    const [someState, setSomeState] = useState(true);

    const [viewComments, setViewComments] = useState(false);
    const { id } = useParams();
    const token = useGetOneTokenById(id);

    if (!token.articleContent) return <></>;

    function onViewCommentsButtonClick(e) {
        setViewComments(true);
    };

    function onHideCommentsButtonClick(e) {
        setViewComments(false);
    };

    console.log(token.articleContent.comments);

    return (
        <div>
            <div className={styles.tokenArticleContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{token.name.toUpperCase()}</h1>
                    <SvgImage name={token.name} height='45' width='45' />
                </div>
                <div className={styles.articleContent}>
                    <h2 className={styles.articleHeader}>Introduction</h2>
                    <p className={styles.articleParagraph}>
                        {token.articleContent.introduction}
                    </p>
                    <h2 className={styles.articleHeader}>What is {token.name}?</h2>
                    <p className={styles.articleParagraph}>
                        {token.articleContent.definition}
                    </p>
                    <h2 className={styles.articleHeader}>How does {token.name} work?</h2>
                    <p className={styles.articleParagraph}>
                        {token.articleContent.methodology}
                    </p>
                    <h2 className={styles.articleHeader}>What makes {token.name} special?</h2>
                    <p className={styles.articleParagraph}>
                        {token.articleContent.specialties}
                    </p>
                    <h2 className={styles.articleHeader}>How does {token.name} benefit the crypto ecosystem?</h2>
                    <p className={styles.articleParagraph}>
                        {token.articleContent.benefits}
                    </p>
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
            {viewComments
                ? (
                    <div className={styles.commentsContainer}>
                        {/* <h1>Comments</h1> */}
                        <Comment state={someState}/>
                    </div>
                )
                : null
            }
        </div>
    );
};

export default TokenDetails;