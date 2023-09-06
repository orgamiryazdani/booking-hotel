import { useState } from "react"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form className="form">
                <div className="formControl">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        type="text"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        type="password"
                    />
                </div>
                <div className="buttons">
                    <button className="btn btn--primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login