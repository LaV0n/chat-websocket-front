import React, {KeyboardEvent, useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import styles from './App.module.scss';
import {Message} from "./features/Message/Message";
import {UserBlock} from "./features/UserBlock/UserBlock";
import {Avatars} from "./common/Avatars";

const socket = socketIo("http://localhost:3003/", {
    withCredentials: true,
});
export type MessageType = {
    message: string
    user: string
    avatar:string
}


function App() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [text, setText] = useState('')
    const [user, setUser] = useState<string>('')
    const [avatar, setAvatar] = useState<string>(Avatars.anonymous)

    const scrollDown = () => {
        const elem = document.getElementById('block');
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    }

    const messageHandler = () => {
        let msg = {message: text, user,avatar} as MessageType
        socket.emit('send-message', msg)
        setMessages([...messages, msg])
        setText('')
    }

    const enterPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            messageHandler()
        }
    }


    useEffect(() => {
        socket.on('receive-message', (msg: MessageType) => {
            console.log(msg.message)
            console.log('your id' + socket.id)
            setMessages([...messages, msg])
        });

    })

    scrollDown()

    return (
        <div className={styles.App}>
            <div className={styles.window}>
                <div className={styles.userBlock}>
                    <UserBlock user={user}
                               setUser={setUser}
                               setAvatar={setAvatar}
                               avatar={avatar}/>
                    <div>rooms</div>
                </div>
                <div className={styles.messages}>
                    <div className={styles.block} id={'block'}>
                        {messages.map((m, index) =>
                            <Message messageData={m}
                                     isOwner={m.user === user}
                                     key={index}
                                     avatar={m.avatar}/>
                        )}
                    </div>
                    <div className={styles.sendArea}>
                    <textarea value={text}
                              onChange={(e) => setText(e.currentTarget.value)}
                              onKeyDown={enterPressHandler}>

                    </textarea>
                        <button onClick={messageHandler}
                        >send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
