import styles from './Dialog.module.scss'
import {Message} from "../Message/Message";
import React, {KeyboardEvent,  useState} from "react";
import {MessageType} from "../../App";

type DialogType = {
    editUser: boolean
    user: string
    avatar: string
    userId: string
    socket: any
    activeRoom: string
    messages: MessageType[]
    setMessages: (value: MessageType[]) => void
}

export const Dialog = ({editUser, user, avatar, userId, socket, activeRoom, messages, setMessages}: DialogType) => {

    const [text, setText] = useState('')

    const enterPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            messageHandler()
        }
    }
    const scrollDown = () => {
        const elem = document.getElementById('block');
        if (elem) {
            setTimeout(() => elem.scrollTop = elem.scrollHeight, 1000);
        }
    }

    const messageHandler = () => {
        let msg = {message: text, user, avatar, userId, room: activeRoom} as MessageType
        socket.emit("send-message", msg)
        setMessages([...messages, msg])
        setText('')
    }


    scrollDown()

    return (
        <div className={styles.messages}>
            {!editUser && <div className={styles.messagesHidden}></div>}
            <div className={styles.block} id={'block'}>
                {messages.filter(m => m.room === activeRoom).map((m, index) =>
                    <Message messageData={m}
                             isOwner={m.userId === userId}
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
    )
}