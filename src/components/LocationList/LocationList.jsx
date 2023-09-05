import useFetch from "../../hooks/useFetch"
import Loader from "../Loader/Loader"

function LocationList() {
    const { data, isLoading } = useFetch("http://localhost:5000/hotels", "")

    if (isLoading) return <Loader />

    return (
        <div className="nearbyLocation">
            <h2>Nearby Location</h2>
            <div className="locationList">
                {
                    data.map((item) => {
                        return <div key={item.id} className="locationItem">
                            <img src={item.picture_url.url} alt={item.name} />
                            <div className="locationItemDesc">
                                <p className="location">{item.smart_location}</p>
                                <p className="name">{item.name}</p>
                                <p className="price">
                                    €&nbsp;{item.price}&nbsp;
                                    <span>night</span>
                                </p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default LocationList