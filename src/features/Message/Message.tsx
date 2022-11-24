import {MessageType} from "../../App";
import styles from './Message.module.scss'
import React from "react";

type MessagePropsType = {
    messageData: MessageType
    isOwner: boolean
    avatar:string
}


export const Message = ({messageData, isOwner,avatar}: MessagePropsType) => {
    return (
        <div className={styles.block} style={isOwner? {paddingLeft:' calc(100% - 500px)'}:{}}>
            {isOwner &&
                <div className={styles.owner} >
                    {messageData.message}
                </div>
            }
            <div className={styles.user}>
                <img src={avatar} alt={'0'}/>
                <span>{messageData.user}</span>
            </div>
            {!isOwner &&
                <div className={styles.userMessage} >
                    {messageData.message}
                </div>
            }
        </div>
    )
}