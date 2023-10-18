import { useNavigate, useParams } from "react-router-dom"
import { useBookmark } from "../context/BookmarkListContext"
import { useEffect } from "react"
import Loader from "../Loader/Loader"
import ReactCountryFlag from "react-country-flag"

function SingleBookmark() {
    const { id } = useParams()
    const { getBookmark, isLoading, currentBookmark } = useBookmark()
    const navigate = useNavigate()
    useEffect(() => {
        getBookmark(id)
    }, [id]);

    if (isLoading || !currentBookmark) return <Loader />

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn--back"> &rarr; برگشت</button>
            <div className='bookmarkItem' style={{ marginTop: "20px" }}>
                <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
                &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp; <span>{currentBookmark.country}</span>
            </div>
        </div>
    )
}

export default SingleBookmark