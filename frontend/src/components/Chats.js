import React, { useState, useEffect } from 'react';


const Messages = () => {

    useEffect(() => {


        const chatSocket = new WebSocket(
            'ws://'
            // + window.location.host
            + "localhost:8000"
            + '/ws/chat/teddy'
            + '/'
        );

        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            console.log(data)
                ;
        };

        chatSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };


    }, []);
    const [messages, setMessages] = useState([
        {
            from_user: 'kid',
            name: 'Alice',
            image_url: 'https://gptteddy.blob.core.windows.net/images/kid.jpeg',
            message: 'Hi Teddy!',
            created_at: ""
        },
        {
            from_user: 'teddy',
            name: '',
            image_url: 'https://gptteddy.blob.core.windows.net/images/image_181.png',
            message: 'Hello Alice, how are you today?',
            created_at: ""
        },
        {
            from_user: 'kid',
            name: 'Alice',
            image_url: 'https://gptteddy.blob.core.windows.net/images/kid.jpeg',
            message: 'I am doing great! How about you?',
            created_at: ""
        },
        {
            from_user: 'teddy',
            name: '',
            image_url: 'https://gptteddy.blob.core.windows.net/images/image_181.png',
            message: "I'm always happy to talk to you, Alice!",
            created_at: ""
        }
    ]);

    return (
        <div className="flex flex-col flex-1 px-4 py-6 overflow-y-auto">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.user === 'kid' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {
                        message.user === 'kid' ? (<>
                            <div className={`max-w-xs rounded-lg px-4 py-2 ${message.user === 'kid' ? 'bg-orange-300 text-gray-800' : 'bg-brown-500 text-white'}`}>
                                <p className={`${message.user === 'kid' ? 'font-medium' : ''}`}>{message.text}</p>
                            </div> <img
                                src={message.imageUrl}
                                alt={message.name}
                                className={`h-8 w-8 rounded-full ${message.user === 'kid' ? 'ml-2' : 'mr-2'}`}
                            /></>) : (<>     <img
                                src={message.imageUrl}
                                alt={message.name}
                                className={`h-8 w-8 rounded-full ${message.user === 'kid' ? 'ml-2' : 'mr-2'}`}
                            />   <div className={`max-w-xs rounded-lg px-4 py-2 ${message.user === 'kid' ? 'bg-orange-300 text-gray-800' : 'bg-brown-500 text-white'}`}>
                                    <p className={`${message.user === 'kid' ? 'font-medium' : ''}`}>{message.text}</p>
                                </div>
                            </>)
                    }

                </div>
            ))}
        </div>
    );
}

export default Messages;
