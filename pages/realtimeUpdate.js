import React, { useEffect, useState } from 'react'

import io from 'socket.io-client';

function realtimeUpdate() {
    const socket = io(`https://socket-server-test-ml.herokuapp.com`);

    const [temp, setTemp] = useState(null)

    useEffect(() => {
        socket.on('lambda', (data) => {
            console.log(data);
            setTemp(data)
        });
    }, [socket])
    
  return (
    <div>
        realtimeUpdate
        <div>
            {temp? 
            <div>
                <div>userId</div>
                <div>{temp.userId}</div>

                <div>reportId</div>
                <div>{temp.reportId}</div>

                <div>flag</div>
                <div>{temp.flag}</div>

                <div>token</div>
                <div>{temp.token}</div>
            </div>: null}
        </div>
        </div>
  )
}

export default realtimeUpdate