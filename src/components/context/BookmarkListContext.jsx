import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = "http://localhost:5000"

const BookmarkContext = createContext()

function BookmarkListProvider({ children }) {
    const [currentBookmark, setCurrentBookmark] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchBookmarkList() {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`${BASE_URL}/bookmarks`)
                setBookmarks(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBookmarkList()
    }, [])

    async function getBookmark(id) {
        setIsLoading(true)
        setCurrentBookmark(null)
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            setCurrentBookmark(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function createBookmark(newBookmark) {
        setIsLoading(true)
        try {
            const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark)
            setCurrentBookmark(data)
            setBookmarks(prev => [...prev, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteBookmark(id) {
        setIsLoading(true)
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`)
            setBookmarks(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return <BookmarkContext.Provider value={{ isLoading, bookmarks, deleteBookmark, createBookmark, currentBookmark, getBookmark }}>{children}</BookmarkContext.Provider>
}

export default BookmarkListProvider

export function useBookmark() {
    return useContext(BookmarkContext)
}