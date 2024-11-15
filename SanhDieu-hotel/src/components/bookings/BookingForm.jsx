import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import {  useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import BookingSumary from '../bookings/BookingSumary'
import { FormControl,Form,Button } from 'react-bootstrap'
import { useAuth } from "../auth/AuthProvider"

const BookingForm = () =>{
    const[Validated,setValidated] = useState(false)
    const[isSubmitted,setIsSubmidtted] = useState(false)
    const[errorMessage,setErrorMessage] = useState("")
    const [roomPrice,setRoomPrice] = useState(0)
    const currentUser = localStorage.getItem("userId")
    const [booking,setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })
   
    const { roomId } = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) =>{
        const{ name, value} = e.target
        setBooking({...booking, [name] : value })
        setErrorMessage("")
    }
    const getRoomPriceById = async(roomId) => {
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        }catch(error) {
            throw new Error(error)
        } 
    }

    useEffect(() =>{
        getRoomPriceById(roomId)
    },[roomId])

    const calculatePayment = () =>{
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffinDay = checkOutDate.diff(checkInDate,"days")
        const price = roomPrice ? roomPrice :0
        return diffinDay * price
    }

    const MAX_ADULTS = 3;
    const MAX_CHILDREN = 2;

    const isGuestCountValid = () =>{
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        
         // Kiểm tra giới hạn số người lớn và trẻ em
        if (adultCount > MAX_ADULTS || childrenCount > MAX_CHILDREN) {
            setErrorMessage(`Phòng chỉ cho tối đa ${MAX_ADULTS} người lớn và ${MAX_CHILDREN} trẻ em.`);
            return false;
    }
    return adultCount >= 1 && (adultCount + childrenCount) >= 1;
    }

    const isCheckOutDateValid = () =>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out must come before check-in ")
            return false
        }else{
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()){
            e.stopPropagation()
        }else{
            setIsSubmidtted(true)
        }
        setValidated(true)
    }
    

    const handleFormSubmit = async() => {
        try{
            const roomDetails = await getRoomById(roomId);
                 if (roomDetails.isBooked) {
                    setErrorMessage("Phòng này đã được đặt. Vui lòng chọn phòng khác.");
                    return;
        }
            const confirmationCode = await bookRoom(roomId,booking)
            setIsSubmidtted(true)
            navigate("/booking-success", { state:{message: confirmationCode}})
        }catch(error){
            const errorMessage = error.message
			console.log(errorMessage)
			navigate("/booking-success", { state: { error: errorMessage } })
        }
    }
    return (
    <>
    <div className='container mb-5'>
        <div className="row">
            <div className="col-md-6">
                <div className="card card-body mt-5">
                    <h4 className="card-title">Reserve room</h4>
                    <Form noValidate validated={Validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="guestFullName">Full Name: </Form.Label>
                            <FormControl
                            required
                            type="text"
                            id="guestFullName"
                            name="guestFullName"
                            value={booking.guestFullName}
                            placeholder="Enter your fullname"
                            onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your full name
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="guestEmail" className="hotel-color">Email: </Form.Label>
                            <FormControl
                            required
                            type="email"
                            id="guestEmail"
                            name="guestEmail"
                            value={booking.guestEmail}
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your email
                            </Form.Control.Feedback>
                        </Form.Group>

                    <fieldset style={{border: "2px"}}>
                        <legend>Lodging period</legend>
                        <div className="row">
                            <div className="col-6">
                            <Form.Label htmlFor="checkInDate" className="hotel-color">Check-in date: </Form.Label>
                            <FormControl
                            required
                            type="date"
                            id="checkInDate"
                            name="checkInDate"
                            value={booking.checkInDate}
                            placeholder="check-in-date"
                            onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your start date
                            </Form.Control.Feedback>
                            </div>

                            <div className="col-6">
                            <Form.Label htmlFor="checkOutDate" className="hotel-color">Check-out date: </Form.Label>
                            <FormControl
                            required
                            type="date"
                            id="checkOutDate"
                            name="checkOutDate"
                            value={booking.checkOutDate}
                            placeholder="check-out-date"
                            min={moment().format("YYYY-MM-DD")}
                            onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your end date
                            </Form.Control.Feedback>
                            </div>

                            {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                        </div>
                    </fieldset>

                    <fieldset style={{border: "2px"}}>
                        <legend>Number of Guest</legend>
                        <div className="row">
                            <div className="col-6">
                            <Form.Label htmlFor="numOfAdults" className="hotel-color">Adults: </Form.Label>
                            <FormControl
                            required
                            type="number"
                            id="numOfAdults"
                            name="numOfAdults"
                            value={booking.numOfAdults}
                            placeholder="0"
                            min={1}
                            onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please select at least 1 adult.
                            </Form.Control.Feedback>
                        </div>

                        <div className="col-6">
                            <Form.Label htmlFor="numOfChildren" className="hotel-color">Children: </Form.Label>
                            <FormControl
                            required
                            type="number"
                            id="numOfChildren"
                            name="numOfChildren"
                            value={booking.numOfChildren}
                            placeholder="0"
                            min={0}
                            onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                select 0 if no children
                            </Form.Control.Feedback>
                        </div>
                        </div>
                    </fieldset>

                    <div className='form-group mt-2 mb-2'>
                        <button className='btn btn-hotel' type="submit">Continue</button>
                    </div>
                    </Form>
                </div>
            </div>

            <div className="col-md-4">
                {isSubmitted && (
                    <BookingSumary
                     booking={booking}
                    payment ={calculatePayment()}
                    isFormValid={Validated}
                    onConfirm={handleFormSubmit}/>
                )}
            </div>
        </div>
    </div>

    </>
    )
}
export default BookingForm