import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const BookingSumary = ({ booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate,"days")
    const[isBookingConfirmed,setIsBookingConfirmed] = useState(false)
    const[isProcessingPayment,setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking = () =>{
        setIsProcessingPayment(true)
        setTimeout(() =>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(() =>{
        if(isBookingConfirmed){
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className="row">
        <div className="col-md-6"></div>
        <div className='card card-body mt-5' >
            <h4 className='card-title hotel-color'>Reservation Sumary</h4>
            <p>FullName: <strong>{booking.guestFullName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>Check-in date: <strong>{moment(booking.checkInDate).format("MM Do YYYY")}</strong></p>
            <p>Check-out date: <strong>{moment(booking.checkOutDate).format("MM Do YYYY")}</strong></p>
            <p>Num of days: <strong>{numberOfDays}</strong></p>
            <div>
                <h5 className="hotel-color">Number of guests</h5>
    
                <strong>Adult: {booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}</strong>
                <strong>Children: {booking.numOfChildren }</strong>
            </div> 
            {payment > 0 ? (
                <>
                <p>
                    Total Payment : <strong>${payment}</strong>
                </p>
    
                {isFormValid && !isBookingConfirmed ?(
                    <Button
                    variant ='success' onClick={handleConfirmBooking}>
                        {isProcessingPayment ? (
                                <>
                                <span
                                className='spinner-border spinner-border-sm mr-2'
                                role='status'
                                aria-hidden="true"></span>
                                Booking confirmed,redirecting to payment....
                                </>
                        ):(
                            "Confirm booking and proceed to payment"
                        )}
                    </Button>
                ): isBookingConfirmed ? (
                    
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='sr-only'>Loading</span>
                        </div>
                    </div>
                ) : null}
                </>
            ):(
                <p className='text-danger '>Check-out date must be after check-id date</p>
            )}
        </div>
        </div>
        )
}
export default BookingSumary