import React, { useState } from 'react';

const Messages = () => {
    const [messages, setMessages] = useState([
        {
            user: 'kid',
            name: 'Alice',
            imageUrl: 'https://via.placeholder.com/50',
            text: 'Hi Teddy!'
        },
        {
            user: 'teddy',
            name: '',
            imageUrl: 'https://via.placeholder.com/50',
            text: 'Hello Alice, how are you today?'
        },
        {
            user: 'kid',
            name: 'Alice',
            imageUrl: 'https://via.placeholder.com/50',
            text: 'I am doing great! How about you?'
        },
        {
            user: 'teddy',
            name: '',
            imageUrl: 'https://via.placeholder.com/50',
            text: "I'm always happy to talk to you, Alice!"
        }
    ]);

    return (
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.user === 'kid' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {
                        message.user === 'kid' ? (<>
                            <div className={`max-w-xs rounded-lg px-4 py-2 ${message.user === 'kid' ? 'bg-brown-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                <p className={`${message.user === 'kid' ? 'font-medium' : ''}`}>{message.text}</p>
                            </div> <img
                                src={message.imageUrl}
                                alt={message.name}
                                className={`h-8 w-8 rounded-full ${message.user === 'kid' ? 'ml-2' : 'mr-2'}`}
                            /></>) : (<>     <img
                                src={message.imageUrl}
                                alt={message.name}
                                className={`h-8 w-8 rounded-full ${message.user === 'kid' ? 'ml-2' : 'mr-2'}`}
                            />   <div className={`max-w-xs rounded-lg px-4 py-2 ${message.user === 'kid' ? 'bg-blue-500 text-white' : 'bg-orange-300 text-gray-800'}`}>
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
