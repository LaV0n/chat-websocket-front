import React, {KeyboardEvent, useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import './App.scss';
import {Message} from "./features/Message/Message";

const socket = socketIo("http://localhost:3003/", {
    withCredentials: true,
});
export type MessageType = {
    message: string
    user: string
}


function App() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [text, setText] = useState('')
    const [user, setUser] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [editUser, setEditUser] = useState<boolean>(false)

    const scrollDown = () => {
        const elem = document.getElementById('block');
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    }

    const messageHandler = () => {
        let msg = {message: text, user} as MessageType
        socket.emit('send-message', msg)
        setMessages([...messages, msg])
        setText('')
    }

    const enterPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            messageHandler()
        }
    }

    const setUserHandler = () => {
        setUser(value)
        setValue('')
        setEditUser(true)
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
        <div className="App">
            <div className='window'>
                <div>
                    {editUser
                        ? <div onDoubleClick={()=>setEditUser(false)}>{user}</div>
                        : <div>
                            <input value={value}
                                   onChange={(e) => setValue(e.currentTarget.value)
                                   }/>
                            <button onClick={setUserHandler}>user</button>
                        </div>
                    }

                </div>
                <div className='messages'>
                    <div className='block' id={'block'}>
                        {messages.map((m, index) =>
                            <Message messageData={m} isOwner={m.user===user} key={index}/>
                        )}
                    </div>
                    <div className='sendArea'>
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
