import React, {useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import styles from './App.module.scss';
import {UserBlock} from "./features/UserBlock/UserBlock";
import {Avatars} from "./common/Avatars";
import {Rooms} from "./features/Rooms/Rooms";
import {Dialog} from "./features/Dialog/Dialog";
import {ActiveUsers} from "./features/ActiveUsers/ActiveUsers";

/*const socket = socketIo("http://localhost:3003",{
    transports: [ 'polling'],
});*/

//const socket = socketIo("https://web-socket-back.herokuapp.com");

const socket = socketIo("https://websocket-server-lavon.glitch.me", {
    transports: ['polling']
});


export type MessageType = {
    message: string
    user: string
    avatar: string
    userId: string
    room: string
}
export type UserDataType = {
    name: string
    id: string
}


function App() {

    const [messages, setMessages] = useState<MessageType[]>([])
    const [user, setUser] = useState<string>('')
    const [editUser, setEditUser] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>(Avatars.anonymous)
    const [rooms, setRooms] = useState<string[]>(['general'])
    const [activeRoom, setActiveRoom] = useState('general')
    const [users, setUsers] = useState<UserDataType[]>([])
    const userId = socket.id
    const [menu, setMenu] = useState(true)

    const getMessage = () => {
        socket.on('receive-message', (msg: MessageType) => {
            setMessages([...messages, msg])
        });
        socket.on('new-user', (data: UserDataType[]) => {
            setUsers([...data])
        })

    }

    const newUserConnected = (user: string) => {
        socket.emit("new-user", user);
    };
    const disconnectUser = () => {
        socket.on('user-disconnect', (userID) => {
            setUsers([...users.filter(u => u.id !== userID)])
        })
    }
    const privateMessageCheck = () => {
        socket.on("invite", (room) => {
            socket.emit('join-room', room)
            setRooms([...rooms, room])
        });
    }
    const closeMenuHandler = () => {
        setTimeout(() => setMenu(false), 100)
    }


    useEffect(() => {
        getMessage()
        disconnectUser()
        privateMessageCheck()
    })


    return (
        <div className={styles.App}>
            <div className={styles.window}>
                <div className={menu ? styles.userBlock : styles.userBlockClose}>
                    <UserBlock user={user}
                               setUser={setUser}
                               setAvatar={setAvatar}
                               avatar={avatar}
                               editUser={editUser}
                               setEditUser={setEditUser}
                               newUserConnected={newUserConnected}
                               disconnectUser={disconnectUser}
                               socket={socket}/>
                    <ActiveUsers users={users}
                                 setRooms={setRooms}
                                 rooms={rooms}
                                 socket={socket}
                                 user={user}/>
                    <Rooms rooms={rooms}
                           setRooms={setRooms}
                           setActiveRoom={setActiveRoom}
                           activeRoom={activeRoom}
                           socket={socket}/>
                </div>
                <div className={menu ? styles.closeZone : styles.closeZoneClose}
                     onClick={closeMenuHandler}>
                    <button>X</button>
                </div>
                <Dialog editUser={editUser}
                        user={user}
                        avatar={avatar}
                        userId={userId}
                        socket={socket}
                        activeRoom={activeRoom}
                        messages={messages}
                        setMessages={setMessages}
                        setMenu={setMenu}/>
            </div>
        </div>
    );
}

export default App;
