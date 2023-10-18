import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiLogout, HiMinus, HiPlus } from "react-icons/hi"
import { FaMapPin } from "react-icons/fa"
import { HiSearch } from "react-icons/hi"
import { useRef, useState } from "react"
import useOutsideClick from "../../hooks/useOutsideClick";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { NavLink, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

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
                        placeholder="کجا میروید؟"
                        className="headerSearchInput"
                        name="destination"
                        id="destination"
                    />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">

                    <HiCalendar className="headerIcon dateIcon" />
                    <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
                        انتخاب تاریخ :
                        <br />
                        {`${format(date[0].startDate, "MM/dd/yyy")} تا ${format(date[0].endDate, "MM/dd/yyy")}`}
                    </div>
                    <div className="dir">

                        {openDate && <DateRange
                            onChange={item => setDate([item.selection])}
                            ranges={date}
                            className="date"
                            minDate={new Date()}
                            moveRangeOnFirstSelection={true}
                        />
                        }
                    </div>
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
                        {options.adult} بزرگسالان - {options.children} فرزندان - {options.room} اتاق
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
            <NavLink to="bookmark">
                <div className="bookmarkBTN">
                    نشان شده <FaMapPin/>
                </div>
            </NavLink>
            <User />
        </div>
    )
}

export default Header

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
    const optionsRef = useRef()
    useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false))
    return <div className="guestOptions" ref={optionsRef}>
        <OptionItem handleOptions={handleOptions} name="بزرگسالان" type="adult" options={options} minLimit={1} />
        <OptionItem handleOptions={handleOptions} name="فرزندان" type="children" options={options} minLimit={0} />
        <OptionItem handleOptions={handleOptions} name="اتاق" type="room" options={options} minLimit={1} />
    </div>
}

function OptionItem({ options, type, minLimit, handleOptions, name }) {
    return <div className="guestOptionItem">
        <span className="optionText">{name}</span>
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

function User() {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuth()
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    return <div>
        {isAuthenticated ? <div className="profile">
            <img src="../../../public/images/user.png" className="user-png" alt="" />
            <span>{user.name}</span>
            {/* <button><HiLogout onClick={handleLogout} className="icon" /></button> */}
        </div> :
            <NavLink to='login'>
                <div className="btn loginBTN">
                    ورود
                </div>
            </NavLink>
        }
    </div>

}