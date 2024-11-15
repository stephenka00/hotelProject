import React, { useEffect } from'react'
import { getRoomTypes, addRoomType } from '../utils/ApiFunctions'
import {useState} from 'react'

const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {
    const[roomTypes,setRoomTypes] = useState([""])
    const[showNewRoomTypeInput,setShowNewRoomTypesInput] = useState(false)
    const[newRoomType,setNewRoomTypes] = useState("")
    
    useEffect(() =>{
        getRoomTypes().then((data) =>{
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) =>{
        setNewRoomTypes(e.target.value);
    }

    const handleAddNewRoomType = async () =>{
        if(newRoomType !== ""){
           try {
                // Gọi API để thêm loại phòng mới vào database
                const savedRoomType = await addRoomType(newRoomType);

                // Cập nhật roomTypes với loại phòng mới vừa được thêm vào
                setRoomTypes([...roomTypes, savedRoomType]);
                setNewRoomTypes("");
                setShowNewRoomTypesInput(false);
            } catch (error) {
                console.error("Failed to add room type", error);
            }
        }
    }
    
    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                <select
                required
                className='form-select' 
                name="roomType"
                onChange={(e) =>{
                    if(e.target.value === "Add New"){
                        setShowNewRoomTypesInput(true)
                    }else{
                        handleRoomInputChange(e)
                    }
                }}
                value={newRoom.roomType}>
                <option value="">select a room type</option>
                <option value={"Add New"}>Add New</option>
                {roomTypes.map((type,index)=>(
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
                </select>
                {showNewRoomTypeInput && (
                    <div className='mt-2'>
                        <div className='input-group'>
                        <input 
                        type="text" 
                        className="form-control"
                        placeholder='Enter a new room type'
                        value={newRoomType}
                        onChange={handleNewRoomTypeInputChange} 
                        />
                        <button className='btn btn-hotel' type="button" onClick={handleAddNewRoomType}>
                            Add
                        </button>
                        </div>
                    </div>
                )}
                </div>
            )}
        </>
    )
}
export default RoomTypeSelector;