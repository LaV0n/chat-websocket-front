import React, {useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import './App.css';

const socket = socketIo("http://localhost:3003/", {
    withCredentials: true,
});


function App() {
    const [messages, setMessages] = useState<string[]>([])
    const [text, setText] = useState('')

    const messageHandller = () => {
        socket.emit('chat message', text)
        setText('')
    }


    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages([...messages, msg])
        });
        window.setInterval(function() {
            const elem = document.getElementById('block');
            if(elem){
                elem.scrollTop = elem.scrollHeight;
            }
        }, 1000);
    })


    return (
        <div className="App">
            <div className='messages'>
                <div className='block' id={'block'}>
                    {messages.map(m =>
                        <div key={m} className={'message'}>
                            {m}
                            <hr/>
                        </div>
                    )}
                </div>
                <div className='sendArea'>
                    <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
                    <button onClick={messageHandller} >send</button>
                </div>
            </div>
        </div>
    );
}

export default App;
