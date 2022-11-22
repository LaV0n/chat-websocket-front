import styles from './Rooms.module.scss'
import {useState} from "react";

type RoomsType = {
    rooms: string[]
    setRooms: (value: string[]) => void
    setActiveRoom: (value: string) => void
    activeRoom: string
    socket: any
}

export const Rooms = ({rooms, setRooms, setActiveRoom, activeRoom, socket}: RoomsType) => {

    const [value, setValue] = useState('')

    const createRoomHandler = () => {
        setRooms([...rooms, value])
        setValue('')
    }

    const openRoomHandler = (room: string) => {
        setActiveRoom(room)
        socket.emit('join-room', room)
    }

    const deleteRoomHandler=(room:string)=>{
        if(room===activeRoom){
            setActiveRoom('general')
        }
        setRooms([...rooms.filter(r=>r!==room)])
    }

    return (
        <div className={styles.container}>
            <h4>ROOMS</h4>
            <div className={styles.roomBlock}>
                <input value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
                <button onClick={createRoomHandler}>+</button>
            </div>
            <div className={styles.roomsList}>
                {rooms.map((r, index) =>
                    <div key={index} className={styles.roomPanel}>
                    <button onClick={() => openRoomHandler(r)}
                            className={styles.roomButton}
                            style={activeRoom === r
                                ? {backgroundColor: 'rgba(0, 128, 0, 0.7)'}
                                : {backgroundColor: 'rgba(87, 87, 87, 0.46)'}}>
                        {r}
                    </button>
                        {r!=='general' && <button onClick={()=>deleteRoomHandler(r)}>x</button> }
                    </div>
                )}
            </div>
        </div>
    )
}