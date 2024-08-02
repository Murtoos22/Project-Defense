import React, { useState } from 'react'

const Comment = () => {
    const [viewReplies, setViewReplies] = useState(false);

    function onViewRepliesButtonClick() {
        setViewReplies(true);
    };  

    return (
        <>
            <button onClick={onViewRepliesButtonClick}>View Replies</button>
            {viewReplies
                ? (
                    <div>REPLIES</div>
                ) : null
            }
        </>
    )
}

export default Comment