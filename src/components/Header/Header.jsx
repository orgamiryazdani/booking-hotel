import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiMinus, HiPlus } from "react-icons/hi"
import { HiSearch } from "react-icons/hi"
import { useRef, useState } from "react"
import useOutsideClick from "../../hooks/useOutsideClick";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
    const [searchParams] = useSearchParams()
    const [destination, setDestination] = useState(searchParams.get("destination") || "");
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ])
    const [openDate, setOpenDate] = useState(false)

    const navigate = useNavigate()

    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const handleSearch = () => {
        const encodedParams = createSearchParams({
            data: JSON.stringify(date),
            destination,
            options: JSON.stringify(options)
        })
        //setSearchParams(encodedParams)
        navigate({
            pathname: "/hotels",
            search: encodedParams.toString()
        })
    }

    return (
        <div className="header">
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className="headerIcon locationIcon" />
                    <input
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        type="text"
                        placeholder="where to go?"
                        className="headerSearchInput"
                        name="destination"
                        id="destination"
                    />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon" />
                    <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
                        {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(date[0].endDate, "MM/dd/yyy")}`}
                    </div>
                    {openDate && <DateRange
                        onChange={item => setDate([item.selection])}
                        ranges={date}
                        className="date"
                        minDate={new Date()}
                        moveRangeOnFirstSelection={true}
                    />
                    }
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
                        {options.adult} adult &bull; {options.children} children &bull; {options.room} room
                    </div>
                    {
                        openOptions && <GuestOptionList options={options} setOpenOptions={setOpenOptions} handleOptions={handleOptions} />
                    }
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn" onClick={handleSearch}>
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
    const optionsRef = useRef()
    useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false))
    return <div className="guestOptions" ref={optionsRef}>
        <OptionItem handleOptions={handleOptions} type="adult" options={options} minLimit={1} />
        <OptionItem handleOptions={handleOptions} type="children" options={options} minLimit={0} />
        <OptionItem handleOptions={handleOptions} type="room" options={options} minLimit={1} />
    </div>
}

function OptionItem({ options, type, minLimit, handleOptions }) {
    return <div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
            <button
                className="optionCounterBtn"
                onClick={() => handleOptions(type, "dec")}
                disabled={options[type] <= minLimit}
            >
                <HiMinus className="icon" />
            </button>
            <span className="optionCounterNumber">{options[type]}</span>
            <button className="optionCounterBtn" onClick={() => handleOptions(type, "inc")}>
                <HiPlus className="icon" />
            </button>
        </div>
    </div>
}