import React, { useState } from 'react';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
    const [viewReplies, setViewReplies] = useState(false);

    function onViewRepliesButtonClick() {
        setViewReplies(true);
    };

    return (
        <div className={styles.commentContainer}>
            <div className={styles.usernameContainer}>
                <p className={styles.username}>Username</p>
            </div>
            <div className={styles.commentbodyContainer}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, dicta. Nemo cumque velit eum recusandae sit placeat aperiam consequatur rem totam eveniet omnis, similique, saepe assumenda modi inventore quos quo ab blanditiis temporibus dolore dolor quidem perferendis ipsam voluptatibus? Voluptates dolor qui in nobis cumque exercitationem alias molestiae rerum autem.</p>
            </div>
            <button
                className={styles.viewRepliesButton}
                onClick={onViewRepliesButtonClick}
            >
                view replies
            </button>
        </div>
    );
};

export default Comment;