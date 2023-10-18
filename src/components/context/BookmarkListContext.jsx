import { createContext, useContext, useEffect, useReducer } from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = "http://localhost:5000"

const BookmarkContext = createContext()

const initialState = {
    bookmarks: [],
    isLoading: false,
    currentBookmark: null,
    error: null
}

function bookmarkReducer(state, action) {
    switch (action.type) {
        case "loading": return {
            ...state,
            isLoading: true
        }
        case "bookmarks/loaded": return {
            ...state,
            isLoading: false,
            bookmarks: action.payload
        }
        case "bookmark/loaded": return {
            ...state,
            isLoading: false,
            currentBookmark: action.payload
        }
        case "bookmark/created": return {
            ...state,
            isLoading: false,
            bookmarks: [...state.bookmarks, action.payload],
            currentBookmark: action.payload
        }
        case "bookmark/deleted": return {
            ...state,
            isLoading: false,
            bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
            currentBookmark: null
        }
        case "rejected": return {
            ...state,
            isLoading: false,
            error: action.payload
        }
        default:
            throw new Error("اقدام ناشناخته")
    }
}

function BookmarkListProvider({ children }) {

    const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(bookmarkReducer, initialState)

    useEffect(() => {
        async function fetchBookmarkList() {
            dispatch({ type: "loading" })
            try {
                const { data } = await axios.get(`${BASE_URL}/bookmarks`)
                dispatch({ type: "bookmarks/loaded", payload: data })
            } catch (error) {
                toast.error(error.message)
                dispatch({ type: "rejected", payload: "در بارگیری نشان ها خطایی رخ داد" })
            }
        }
        fetchBookmarkList()
    }, [])

    async function getBookmark(id) {
        if (Number(id) === currentBookmark?.id) return;
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            dispatch({ type: "bookmark/loaded", payload: data })
        } catch (error) {
            toast.error(error.message)
            dispatch({ type: "rejected", payload: "خطایی در واکشی نشان واحد رخ داد" })
        }
    }

    async function createBookmark(newBookmark) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark)
            dispatch({ type: "bookmark/created", payload: data })

        } catch (error) {
            toast.error(error.message)
            dispatch({ type: "rejected", payload: error.message })
        }
    }

    async function deleteBookmark(id) {
        dispatch({ type: "loading" })
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`)
            dispatch({ type: "bookmark/deleted", payload: id })
        } catch (error) {
            toast.error(error.message)
            dispatch({ type: "rejected", payload: error.message })
        }
    }

    return <BookmarkContext.Provider value={{ isLoading, bookmarks, deleteBookmark, createBookmark, currentBookmark, getBookmark }}>{children}</BookmarkContext.Provider>
}

export default BookmarkListProvider

export function useBookmark() {
    return useContext(BookmarkContext)
}