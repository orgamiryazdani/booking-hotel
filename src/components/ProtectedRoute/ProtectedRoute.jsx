import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useEffect } from "react"
import toast from "react-hot-toast"

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || null)
        if (!isAuthenticated && user == null) {
            toast.error("لطفاوارد شوید")
            navigate("/")
        }
    }, [isAuthenticated, navigate])
    return isAuthenticated ? children : null
}

export default ProtectedRoute