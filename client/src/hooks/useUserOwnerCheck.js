import { useEffect, useState } from 'react';
import { getUser } from '../api/user-api';

export default function useUserOwnerCheck(comment) {
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getUser();
            if(user._id === comment.author.toString()) {
                setIsOwner(true);
            };
        })();
    }, []);
    
    return isOwner;
};