import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useUserLoginCheck() {
    const navigate = useNavigate();
    const isLoggedIn = Cookies.get('token');
    return {
        isLoggedIn,
        checkAndRedirect: function () {
            useEffect(() => {
                if (isLoggedIn) navigate('/');
            }, []);
            return isLoggedIn;
        },
        navigate,
    };
};
