import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'
import moment from "moment"
const FindBooking = () =>{
    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] =useState(null)
    const[successMessage, setSuccessMessage] = useState("")
    const[isLoading ,setIsLoading] =useState(false)
    const[bookingInfo, setBookingInfo] = useState({
        id: "",
        room: {id:"", roomType: ""},
        bookingConfirmationCode: "",
        roomNumber : "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    })

    const emptyBookingInfo = {
        id: "",
        room: {id:"", roomType: ""},
        bookingConfirmationCode: "",
        roomNumber : "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    }

const[isDeleted, setIsDeleted] = useState(false)

const handleInputChange = (event) => {
    setConfirmationCode(event.target.value)
}

const handleFormSubmit = async(event) => {
    event.preventDefault()
    setIsLoading(true)
    try{
        const data = await getBookingByConfirmationCode(confirmationCode)
        setBookingInfo(data)
        setError(null)
    }catch(error){
        setBookingInfo(emptyBookingInfo)
        if(error.response && error.response.status === 404) {
            setError(error.response.data.message)
        }else{
            setError(error.response)
        }
    }
    setTimeout(() =>{
        setIsLoading(false)
    }, 2000)
}

const handleBookingCancellation = async (bookingId) => {
    try{
        await cancelBooking(bookingInfo.id)
        setIsDeleted(true)
        setSuccessMessage("Booking has been cancelled successfully")
        setBookingInfo(emptyBookingInfo)
        setConfirmationCode("")
        setError(null)
    }catch(error) {
        setError(error.message)
    }
    setTimeout(()=>{
        setSuccessMessage("")
        setIsDeleted(false)
    },2000)
}
    return(
        <>
        <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
            <h2 className='text-center mb-4'>Find my booking</h2>
            <form className='col-md-6' onSubmit={handleFormSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" 
                    id="confirmationCode" 
                    name='confirmationCode'
                    value={confirmationCode}
                    onChange={handleInputChange}
                    placeholder='Enter the booking confirmation code'/>
                
                    <button className='btn-hotel btn input-group-text' type='submit'>Find booking</button>
                </div>
            </form>

            {isLoading ? (<div>finding booking</div>
            ): error ? (<div className='text-danger'>Error: {error}</div>

            ): bookingInfo.bookingConfirmationCode ?(
                <div className='col-md-6 mt-4 mb-5'>
                    <h3>Booking Infomation</h3>
                    <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                    <p>Room Number: {bookingInfo.room.id}</p>
                    <p>Room Type: {bookingInfo.room.roomType}</p>
                    <p>Check-in Date:{" "} {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</p>
                    <p>Check-out Date: {" "}{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</p>
                    <p>Full name: {bookingInfo.guestFullName}</p>
                    <p>Email address: {bookingInfo.guestEmail}</p>
                    <p>Adults: {bookingInfo.numOfAdults}</p>
                    <p>Children: {bookingInfo.numOfChildren}</p>
                    <p>Total guest: {bookingInfo.totalNumOfGuest}</p>


                    {!isDeleted && (
                        <button
                        className='btn btn-danger'
                        onClick={() => handleBookingCancellation(bookingInfo.id)}>
                            Cancle Booking
                        </button>
                    )}
                </div>
            ): (
                <div>find booking....</div>
            )}
            {isDeleted && <div className="alert alert-success mt-3 fade show" >{successMessage}</div>}
        </div>
        </>
    )
}
export default FindBooking