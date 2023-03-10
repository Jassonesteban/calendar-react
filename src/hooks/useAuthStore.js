import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarAPI } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector(state => state.auth); 
    const dispatch = useDispatch();

    const statLogin = async({email, password}) => {
        dispatch(onChecking());
        try {
            const {data} = await calendarAPI.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const statRegister = async({email, password, name}) => {
        dispatch(onChecking());
        try {
            const {data} = await calendarAPI.post('/auth/new', {email, password, name});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
            Swal.fire('Usuario creado con exito', '', 'success');
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarAPI.get('auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }
    
    return {
        errorMessage,
        status,
        user,
        checkAuthToken,
        statLogin,
        startLogout,
        statRegister,
    }
}