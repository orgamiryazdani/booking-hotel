import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { NavLink, useNavigate } from "react-router-dom"

function SignUp() {
    const [signUpForm, setSignUpForm] = useState({
        name: "",
        email: "",
        password: "",
    })
    const changeHandler = (e) => {
        setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value })
    }
    const { signup, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (signUpForm) signup(signUpForm)
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/", { replace: true })
    }, [isAuthenticated, navigate])

    return (
        <div className="loginContainer">
            <h2>ثبت نام</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="formControl">
                    <label htmlFor="email">نام</label>
                    <input
                        value={signUpForm.name}
                        onChange={(e) => changeHandler(e)}
                        name="name"
                        id="name"
                        type="text"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="email">ایمیل</label>
                    <input
                        value={signUpForm.email}
                        onChange={(e) => changeHandler(e)}
                        name="email"
                        id="email"
                        type="text"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="password">کلمه عبور</label>
                    <input
                        value={signUpForm.password}
                        onChange={(e) => changeHandler(e)}
                        name="password"
                        id="password"
                        type="password"
                    />
                </div>
                <div className="buttons">
                    <button className="btn btn--primary">ثبت نام</button>
                </div>
            </form>
            <div style={{ paddingTop: "20px", color: "blue" }}>
                <NavLink to="/login">وارد شوید !</NavLink>
            </div>
        </div>
    )
}

export default SignUp