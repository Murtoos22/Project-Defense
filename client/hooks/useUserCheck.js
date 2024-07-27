import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useUserCheck() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get('token');
        if (authToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return isLoggedIn;
};
