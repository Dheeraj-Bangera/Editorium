import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const JoinRoom = () => {
  return (
    <div className="w-full max-w-lg space-y-6">
      <h2 className="text-3xl font-light text-gray-200">Join Room</h2>
      <Input type="text" placeholder="Room ID" className="w-full p-4 bg-gray-800 border-none rounded-md text-gray-300 focus:ring-2 focus:ring-gray-600" />
      <Input type="password" placeholder="Password" className="w-full p-4 bg-gray-800 border-none rounded-md text-gray-300 focus:ring-2 focus:ring-gray-600" />
      <Button className="w-full py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">Join</Button>
    </div>
  )
}

export default JoinRoom
