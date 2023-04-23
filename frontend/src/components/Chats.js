import React, { useState, useEffect } from 'react';


const Messages = () => {


    const [messages, setMessages] = useState([

    ]);

    useEffect(() => {


        const chatSocket = new WebSocket(
            'ws://'
            // + window.location.host
            + "20.232.156.33"
            + '/ws/chat/teddy'
            + '/'
        );

        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            setMessages(data.message.reverse());
            console.log(data.message);

            ;
        };

        chatSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };


    }, []);

    return (<>
        <h1 className='pb-3 mt-5 text-4xl font-bold text-center bold'>Learning Journey</h1>

        <div className='w-full pb-3 mt-5 border-t border-gray-400'></div>

        <div className="flex flex-col flex-1 px-4 py-6 overflow-y-auto">


            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.from_user === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {
                        message.from_user === 'user' ? (<>
                            <div className={`max-w-xs rounded-lg px-4 py-2 ${message.from_user === 'user' ? 'bg-orange-300 text-gray-800' : 'bg-brown-500 text-white'}`}>
                                <p className={`${message.from_user === 'user' ? 'font-medium' : ''}`}>{message.message}</p>
                            </div> <img
                                src={message.image_url}
                                alt={message.created_at}
                                className={`h-8 w-8 rounded-full ${message.from_user === 'user' ? 'ml-2' : 'mr-2'}`}
                            /></>) : (<>  <img
                                src={message.image_url}
                                alt={message.created_at}
                                className={`h-8 w-8 rounded-full ${message.from_user === 'user' ? 'ml-2' : 'mr-2'}`}
                            />   <div className={`max-w-xs rounded-lg px-4 py-2 ${message.from_user === 'user' ? 'bg-orange-300 text-gray-800' : 'bg-brown-500 text-white'}`}>
                                    <p className={`${message.from_user === 'user' ? 'font-medium' : ''}`}>{message.message}</p>
                                </div>

                            </>)
                    }

                </div>
            ))}
        </div>
    </>
    );
}

export default Messages;
