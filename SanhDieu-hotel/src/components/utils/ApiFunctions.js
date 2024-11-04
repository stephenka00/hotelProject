import axios from 'axios'

export const api = axios.create( {
    baseURL:"http://localhost:8080",
}); 

/* This function adds a new room room to the database */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if(response.status === 201){
        return true 
    }else {
        return false
    }

}
/* this function gets all room types from the database*/
export async function getRoomTypes() {
    try{
        const response = await api.get("/rooms/room/types")
        return response.data

    }catch(error) {
        throw new Error("error fetching room type")
    }
}
/* This function adds a new room type to the database */
export async function addRoomType(roomType) {
    try {
        const response = await api.post("/rooms/add/room-type",  {roomType} )
        return response.data // Return the saved room type
    } catch (error) {
        throw new Error("Error adding new room type");
    }
}
/* This functions gets all rooms from database */
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}
/* This function deletes a room by the id */
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error deleting room ${error.message}`)
    }
}
/*this function updates a room */
export async function updatedRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType",roomData.roomType)
    formData.append("roomPrice",roomData.roomPrice)
    formData.append("photo",roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`)
    return response
}
/*this function gets a room by id */
export async function getRoomById(roomId) {
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
}