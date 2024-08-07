import { useEffect, useState } from "react";
import { getUser } from "../api/user-api";
import { getAllTokens } from "../api/token-api";

export default function useGetUserComments() {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

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

                setComments(userSpecificComments);
            } catch (error) {
                console.error('Error fetching user comments:', error);
            } finally {
                setLoading(false);
            };
        })();
    }, []);

    return { loading, comments };
};
