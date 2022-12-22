import styles from './Dialog.module.scss'
import {Message} from "../Message/Message";
import React, {KeyboardEvent, useState} from "react";
import {MessageType} from "../../App";
import menuIcon from "../../assets/icons/icons8.png"
import sendIcon from "../../assets/icons/icons8-email-send-64.png"

type DialogType = {
    editUser: boolean
    user: string
    avatar: string
    userId: string
    socket: any
    activeRoom: string
    messages: MessageType[]
    setMessages: (value: MessageType[]) => void
    setMenu:(value:boolean)=>void
}

export const Dialog = ({editUser, user, avatar, userId, socket, activeRoom, messages, setMessages, setMenu}: DialogType) => {

    const [text, setText] = useState('')

    const enterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && text.length!==0) {
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
            <div className={styles.userPanel}>
                <img src={avatar} alt="0" className={styles.avatar}/>
                <div className={styles.name}>
                    {activeRoom}
                </div>
                <img src={menuIcon} alt="0"
                     className={styles.menuIcon}
                onClick={()=>setMenu(true)}/>
            </div>
            <div className={styles.block} id={'block'}>
                {messages.filter(m => m.room === activeRoom).map((m, index) =>
                    <Message messageData={m}
                             isOwner={m.userId === userId}
                             key={index}
                             avatar={m.avatar}/>
                )}
            </div>
            <div className={styles.sendArea}>
                    <input value={text}
                              onChange={(e) => setText(e.currentTarget.value)}
                              onKeyDown={enterPressHandler}>

                    </input>
                <button onClick={messageHandler}
                        disabled={text.length===0}
                        className={styles.sendButton}
                >send
                </button>
                <button onClick={messageHandler}
                        disabled={text.length===0}
                        className={styles.smallSendButton}
                ><img src={sendIcon} alt='0'/>
                </button>
            </div>
        </div>
    )
}