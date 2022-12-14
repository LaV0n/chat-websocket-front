import styles from './ActiveUsers.module.scss'
import React from "react";
import { UserDataType} from "../../App";

type ActiveUsersType={
    users:UserDataType[]
    setRooms:(value:string[])=>void
    rooms:string[]
    socket:any
    user:string
}

export const ActiveUsers=({users,setRooms,rooms,socket,user}:ActiveUsersType)=>{

    const openPrivateMessages=(u:UserDataType)=>{
        let room=`Private ${u.name}-${user}`
        let roomReverse=`Private ${user}-${u.name}`
        if(rooms.indexOf(room)===-1 && rooms.indexOf(roomReverse)===-1 && u.name!==user){
            setRooms([...rooms,room])
        }
        let data={userID:u.id,room:room}
        socket.emit('private',data)

    }

    return(
        <div className={styles.container}>
                <legend>USERS ONLINE</legend>
                <div className={styles.usersPanel}>
                    {users.map(u =>
                        <div key={u.id}
                             className={styles.userName}
                             onDoubleClick={()=>openPrivateMessages(u)}>
                            {u.name}
                            {u.name!==user &&
                                <span onClick={()=>openPrivateMessages(u)}>+</span>
                            }
                        </div>)
                    }
                </div>
        </div>


    )
}