import React from 'react'

const Messages = ({message}) => {
    return (
        <div className="w-full border-red-900 bg-red-500">
            <p className="text-red-50 lowercase text-base">{message}</p>
        </div>
    )
}

export default Messages
