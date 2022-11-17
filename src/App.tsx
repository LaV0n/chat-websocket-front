import React, {useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import './App.css';

const socket = socketIo("http://localhost:3003/", {
    withCredentials: true,
});


function App() {
    const [messages, setMessages] = useState<string[]>([])
    const [text, setText] = useState('')

    const messageHandller=()=>{
        socket.emit('chat message', text)
        setText('')
    }


    useEffect(() => {
        socket.on('chat message', (msg) =>{
            setMessages([...messages,msg])
        });
    })


    return (
        <div className="App">
            <div className='block'>
                {messages.map(m =>
                    <div key={m}>
                        {m}
                        <hr/>
                    </div>
                )}
            </div>
            <div className='sendArea'>
                <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
                <button onClick={messageHandller}>add </button>
            </div>
        </div>
    );
}

export default App;
