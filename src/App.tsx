import React, {useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import './App.css';

const socket = socketIo("http://localhost:3003/", {
    withCredentials: true,
});
type MessageType = {
    message: string
    user: string
}


function App() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [text, setText] = useState('')

    let user = "123"

    const messageHandler = () => {
        let msg = {message: text, user} as MessageType
        socket.emit('send-message', msg)
        setMessages([...messages, msg])
        setText('')
    }


    useEffect(() => {
        socket.on('receive-message', (msg: MessageType) => {
            console.log(msg.message)
            console.log('your id' + socket.id)
            setMessages([...messages, msg])
        });
        /*    window.setInterval(function() {
                const elem = document.getElementById('block');
                if(elem){
                    elem.scrollTop = elem.scrollHeight;
                }
            }, 1000);*/
    })


    return (
        <div className="App">
            <div className='messages'>
                <div className='block' id={'block'}>
                    {messages.map((m, index) =>
                        <div key={index} className={'message'}>
                            <span>{m.user}----</span>
                            {m.message}
                            <hr/>
                        </div>
                    )}
                </div>
                <div className='sendArea'>
                    <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
                    <button onClick={messageHandler}>send</button>
                </div>
            </div>
        </div>
    );
}

export default App;
