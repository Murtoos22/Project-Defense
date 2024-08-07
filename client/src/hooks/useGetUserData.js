import { useEffect, useState } from "react";
import { getUser } from "../api/user-api";

export default function useGetUserData() {
    const [user, setUser] = useState({});
    useEffect(() => {
        (async () => {
          setUser(await getUser());
        })();
    }, []);

    return user;
};