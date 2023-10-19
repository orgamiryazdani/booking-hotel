import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000"
const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function authReducer(state, action) {
    switch (action.type) {
        case "login": return {
            user: action.payload,
            isAuthenticated: true
        }
        case "signup": return {
            user: action.payload,
            isAuthenticated: true
        }
        case "logout": return {
            user: null,
            isAuthenticated: false
        }
        default: throw new Error("Unknown action!")
    }
}

export default function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || null)
        if (user) {
            dispatch({ type: "login", payload: user })
        }
    }, [])

    async function signup(signUpForm) {
        if (signUpForm) {
            try {
                await axios.post(`${BASE_URL}/users`, signUpForm)
                toast.success("خوش آمدید")
                dispatch({ type: "signup", payload: signUpForm })
                localStorage.setItem("user", JSON.stringify(signUpForm))

            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    async function login(email, password) {
        if (email && password) {
            try {
                const { data } = await axios.get(`${BASE_URL}/users`)
                const user = data.filter((u) => u.email == email && u.password == password)
                if (user.length > 0) {
                    dispatch({ type: "login", payload: user[0] })
                    localStorage.setItem("user", JSON.stringify(user[0]))
                } else {
                    toast.error("ایمیل یا رمز عبور نا معتبر است")
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}