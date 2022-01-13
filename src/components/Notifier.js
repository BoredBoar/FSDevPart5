import React from 'react'
const Notifier = ({message}) => {
    if(message === null) {
        return null
      }
    
      return (
        <div className={message.type}>
          {message.msg}
        </div>
      )
}

export default Notifier