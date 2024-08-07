import { useEffect, useState } from "react";
import { getUser } from "../api/user-api";
import { getAllTokens } from "../api/token-api";

export default function useGetUserComments() {
    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const user = await getUser();
                const tokens = await getAllTokens();

                const allComments = tokens.flatMap(token => 
                    token.articleContent.comments.map(comment => ({
                        ...comment,
                        tokenId: token._id
                    }))
                );

                const userSpecificComments = allComments.filter(comm => comm.author.toString() === user._id);

                setUserComments(userSpecificComments);
            } catch (error) {
                console.error('Error fetching user comments:', error);
            }
        })();
    }, []);

    return userComments;
};
