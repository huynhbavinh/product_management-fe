import { Avatar } from 'antd'
import React from 'react'

function AvatarComponent() {
  const email = JSON.parse(localStorage.getItem('user') || '{}').email;
  return (
    <>
        <Avatar style={{
            width: '2rem',
            height: '2rem',
            backgroundColor: '#b7e6e8',
        }} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${Math.floor(Math.random() * 100) + 1}`} />
        <span style={{
            marginLeft: '1rem',
            fontSize: '1.2rem',
            color: '#fff'
        }}>Welcome, {email}</span>
    </>    
  )
}

export default AvatarComponent