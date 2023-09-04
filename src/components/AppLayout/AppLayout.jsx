import { Outlet } from "react-router-dom"
import Map from "../map/Map"
import { useHotels } from "../context/HotelsProvider"

function AppLayout() {
    const { hotels } = useHotels()
    return (
        <div className="appLayout">
            <div className="sidebar">
                <Outlet />
            </div>
            <Map markerLocations={hotels} />
        </div>
    )
}

export default AppLayout