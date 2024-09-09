import React from 'react'

const username = ({params}:any) => {
  return (
    <div>
      <h1 className='text-white'>{params.username}</h1>
    </div>
  )
}

export default username;
