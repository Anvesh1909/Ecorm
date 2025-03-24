import React from 'react'

const ErrorComp = ({error}) => {
  return (
    <div className='alert alert-danger my-5' role="alert">
        {error}
    </div>
  )
}

export default ErrorComp
