import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../auth";
import { Home } from "../calendar";
import { useAuthStore } from "../hooks";


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);


    if (status === 'checking') {
        return (
            <h3>Cargando, por favor espere......</h3>
        )
    }

    return (
        <Routes>
            {
                (status === "not-authenticated")
                    ? (
                        <>
                            <Route path="/auth/*" element={<Login />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
