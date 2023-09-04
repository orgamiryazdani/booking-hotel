import { createContext, useContext, useState } from "react"
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = "http://localhost:5000"

const BookmarkContext = createContext()

function BookmarkListProvider({ children }) {
    const [currentBookmark, setCurrentBookmark] = useState(null)
    const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] = useState(false)
    const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`)

    async function getBookmark(id) {
        setIsLoadingCurrentBookmark(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            setCurrentBookmark(data)
            setIsLoadingCurrentBookmark(false) 
        } catch (error) {
            toast.error(error.message)
        }
    }

    return <BookmarkContext.Provider value={{ isLoading, bookmarks, currentBookmark, getBookmark, isLoadingCurrentBookmark }}>{children}</BookmarkContext.Provider>
}

export default BookmarkListProvider

export function useBookmark() {
    return useContext(BookmarkContext)
}