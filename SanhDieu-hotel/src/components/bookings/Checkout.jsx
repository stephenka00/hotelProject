import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import RoomCarousel from '../common/RoomCarousel'
import { getRoomById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'

const Checkout = () =>{
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState("")
    const [roomInfo,setRoomInfo] = useState({photo: "", roomType: "",roomPrice: ""})

    const {roomId} = useParams()


useEffect(() => {
    setTimeout(() =>{
        getRoomById(roomId).then((response) => {
            setRoomInfo(response)
            setIsLoading(false)
        }).catch((error) => {
            setError(error)
            setIsLoading(false)
        })
    },2000)
},[roomId])
    return(
        <div>
            <section className="container">
                <div className="row flex-column flex-md-row align-items-center">
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading room infomation</p>
                        ): error ? (
                            <p>{error}</p>
                        ): (
                            <div className="room-info">

                                <img src={`data:image/png;base64,${roomInfo.photo}`} 
                                alt="Room Photo"
                                style={{width:"100%",height:"200px"}}/>
                                <table >
                                    <tbody>

                                        <tr>
                                            <th>Room Type: </th>
                                            <th>{roomInfo.roomType}</th>
                                        </tr>
                                        <tr>
                                            <th>Room Price: </th>
                                            <th>{roomInfo.roomPrice}</th>
                                        </tr>

                                        <tr>
                                            <td>
                                                <ul className='list-unstyled'>
                                                    <li><FaWifi/> Wifi</li>
                                                    <li><FaTv/> Netflix Premium</li>
                                                    <li><FaUtensils/> Breakfast</li>
                                                    <li><FaWineGlassAlt/> Mini bar</li>
                                                    <li><FaCar/> Car service</li>
                                                    <li><FaParking/> Parking space</li>
                                                    <li><FaTshirt/> Laundry</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className='col-md-8'>
                        <BookingForm/>
                    </div>
                </div>
            </section>
            <div className="container">
                <RoomCarousel/>

            </div>
        </div>
    )
}
export default Checkout