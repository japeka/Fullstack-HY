import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    return (
        <div className={ notification.mode}>
          {notification.message }
        </div>
    )
}

export default Notification