import React, { useEffect,useState } from 'react'
import { getRoomById, updatedRoom } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const EditRoom = () => {

    const[room,setRoom] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
        
    })
    const[imagePreview,setImagePreview] = useState("")
    const[successMessage,setSuccessMessage] = useState("")
    const[errorMessage,setErrorMessage]=useState("")

    const {roomId} = useParams()

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setRoom({...room,photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    
    }

    const handleInputChange = (event) =>{
        const{name,value} = event.target
        setRoom({...room,[name]:value})
    }

    useEffect(() => {
        const fetchRoom = async () =>{
            try {
                const roomData = await getRoomById(roomId)
                setRoom({
                    roomType: roomData.roomType || "",
                    roomPrice: roomData.roomPrice || "",
                    photo: roomData.photo || ""
                });
                setImagePreview(roomData.photo)
            }catch(error) {
                console.error(error)
            }
        }
        fetchRoom()
    },[roomId])
    const handleSubmit = async(event) =>{
        event.preventDefault()

        try {
            const formData = new FormData();
            formData.append("roomType", room.roomType);
            formData.append("roomPrice", room.roomPrice);
            if (room.photo) {
                formData.append("photo", room.photo); // Thêm ảnh vào form nếu có
            }

            const response = await updatedRoom(roomId,room)
            if(response.status === 200) {
                setSuccessMessage("Room updated successfully!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            }else {
                setErrorMessage("Error updateing room")
            }
        }catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return(
        <div className="container mt-5 mb-5">
            <h3 className='text-center mb-5 mt-5'>Edit Room</h3>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    {successMessage && (
                        <div className="alert alert-success" role='alert'>{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role='alert'>{errorMessage}</div>
                    )}
                    
                    <form onSubmit={handleSubmit} >
                        <div className='mb-3 '>
                            <label htmlFor="roomType" className="form-label hotel-color" >
                                Room Type
                            </label>
                            <input
                               type='text'
                               className='form-control'
                               id='roomType'
                               name='roomType'
                               value={room.roomType}
                               onChange={handleInputChange} 
                            />
                        </div>
                        <div className='mb-3 '>
                            <label htmlFor="roomPrice" className="form-label">
                                Room Price
                            </label>
                            <input 
                            className='form-control'
                            required
                            id='roomPrice'
                            type='number'
                            name='roomPrice'
                            value={room.roomPrice}
                            onChange={handleInputChange}/>
                        </div>

                        <div className='mb-3 '>
                            <label htmlFor="photo" className="form-label hotel-color">
                                Photo
                            </label>
                           <input 
                           required
                           id='photo'
                           name='photo'
                           type='file'
                           className='form-control'
                           onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                src={imagePreview}
                                alt='Room preview'
                                style={{maxWidth: "400px",maxHeight:"400px"}}
                                className='mt-3'
                                />
                            )}
                        </div>
                        <div className='d-grid gap-2 d-md-flex mt-2'>
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                            back
                            </Link>
                            <button className='btn btn-outline-warning' type='submit'>
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditRoom