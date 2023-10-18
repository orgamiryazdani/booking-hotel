import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("user@gmail.com")
    const [password, setPassword] = useState("1234")
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) login(email, password)
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/", { replace: true })
    }, [isAuthenticated, navigate])

    return (
        <div className="loginContainer">
            <h2>ورود</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="formControl">
                    <label htmlFor="email">ایمیل</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        type="text"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="password">کلمه عبور</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        type="password"
                    />
                </div>
                <div className="buttons">
                    <button className="btn btn--primary">ورود</button>
                </div>
            </form>
        </div>
    )
}

export default Login