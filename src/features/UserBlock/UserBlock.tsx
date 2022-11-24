import styles from './UserBlock.module.scss'
import React, {useState} from "react";
import {Avatars} from "../../common/Avatars";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type UserBlocktype = {
    user: string
    setUser: (value: string) => void
    setAvatar: (value: string) => void
    avatar: string
    editUser:boolean
    setEditUser:(value:boolean)=>void
    newUserConnected:(value:string)=>void
    disconnectUser:()=>void
    socket:any
}

export const UserBlock = ({user, setUser, avatar, setAvatar,editUser,socket,setEditUser,newUserConnected}: UserBlocktype) => {

    const [value, setValue] = useState<string>('')

    const setUserHandler = () => {
        setUser(value)
        setValue('')
        setEditUser(true)
        newUserConnected(value)
        socket.connect()
    }

    const setEditModeHandler=()=>{
        socket.disconnect()
        setEditUser(false)
    }

    return (
        <div className={styles.container}>
            {editUser
                ? <div onDoubleClick={setEditModeHandler }
                       className={styles.user}>
                    <img src={avatar} alt={'0'}/>
                    <div>
                        {user}
                    </div>
                </div>
                : <div className={styles.editBlock}>
                    <div className={styles.avatarsBlock}>
                        <label className={styles.avatarType}>
                            <img src={Avatars.man} alt={'0'}/>
                            <input type="radio"
                                   value='man'
                                   id='man'
                                   name='avatar'
                                   onChange={()=>setAvatar(Avatars.man)}
                            />
                        </label>
                        <label className={styles.avatarType}>
                            <img src={Avatars.woman} alt={'0'}/>
                            <input type="radio"
                                   id="woman"
                                   name="avatar"
                                   value="woman"
                                   onChange={()=>setAvatar(Avatars.woman)}
                            />
                        </label>
                        <label className={styles.avatarType}>
                            <img src={Avatars.anonymous} alt={'0'}/>
                            <input type="radio"
                                   id="anonymous"
                                   name="avatar"
                                   value="anonymous"
                                   onChange={()=>setAvatar(Avatars.anonymous)}
                            />
                        </label>
                        <label className={styles.avatarType}>
                            <img src={Avatars.dog} alt={'0'}/>
                            <input type="radio"
                                   id="dog"
                                   name="avatar"
                                   value="dog"
                                   onChange={()=>setAvatar(Avatars.dog)}
                            />
                        </label>
                        <label className={styles.avatarType}>
                            <img src={Avatars.cat} alt={'0'}/>
                            <input type="radio"
                                   id="cat"
                                   name="avatar"
                                   value="cat"
                                   onChange={()=>setAvatar(Avatars.cat)}
                            />
                        </label>
                    </div>
                    <input value={value}
                           onChange={(e) => setValue(e.currentTarget.value)
                           }/>
                    <button onClick={setUserHandler}
                            disabled={value.length===0}
                    >set user</button>
                </div>
            }
        </div>
    )
}