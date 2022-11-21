import {MessageType} from "../../App";
import styles from './Message.module.scss'
import React from "react";

type MessagePropsType = {
    messageData: MessageType
    isOwner: boolean
}


export const Message = ({messageData, isOwner}: MessagePropsType) => {
    return (
        <div className={styles.block} style={isOwner? {paddingLeft:' calc(100% - 400px)'}:{}}>
            {isOwner &&
                <div className={styles.message} style={{backgroundColor: 'rgba(100, 118, 232, 0.63)'}}>
                    {messageData.message}
                </div>
            }
            <div className={styles.user}>
                <img src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt={'0'}/>
                <span>{messageData.user}</span>
            </div>
            {!isOwner &&
                <div className={styles.message} style={{backgroundColor: 'rgba(157,222,124,0.47)'} }>
                    {messageData.message}
                </div>
            }
        </div>
    )
}