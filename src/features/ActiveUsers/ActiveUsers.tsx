import styles from './ActiveUsers.module.scss'
import React from "react";

type ActiveUsersType={
    users:string[]
}

export const ActiveUsers=({users}:ActiveUsersType)=>{
    return(
        <fieldset className={styles.usersPanel}>
                <legend>USERS ONLINE</legend>
                {users.map(u =>
                    <div key={u} className={styles.userName}>
                        {u}
                    </div>)
                }
        </fieldset>
    )
}