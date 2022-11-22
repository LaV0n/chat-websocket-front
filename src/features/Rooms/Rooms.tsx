import styles from './Rooms.module.scss'
import {useState} from "react";

type RoomsType = {
    rooms: string[]
    setRooms: (value: string[]) => void
    setActiveRoom:(value:string)=>void
    activeRoom:string
    socket:any
}

export const Rooms = ({rooms, setRooms,setActiveRoom,activeRoom,socket}: RoomsType) => {

    const [value, setValue] = useState('')

    const createRoomHandler = () => {
        setRooms([...rooms, value])
        setValue('')
    }

    const openRoomHandler=  (room:string)=>{
        setActiveRoom(room)
         socket.emit('join-room',room)
    }

    return (
        <div className={styles.container}>
            <h4>ROOMS</h4>
            <div className={styles.roomBlock}>
                <input value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
                <button onClick={createRoomHandler}>+</button>
            </div>
            <div className={styles.roomsList}>
                {rooms.map((r,index)=>
                    <button key={index}
                            onClick={()=>openRoomHandler(r)}
                    style={activeRoom===r?{backgroundColor:'green'}:{backgroundColor:'grey'}}>
                        {r}</button>
                )}
            </div>
        </div>
    )
}