import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

const CreateRoom = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [roomName, setRoomName] = useState('')
  const [language, setLanguage] = useState('')
  const [boilerplate, setBoilerplate] = useState('')

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            <Input
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full p-4 bg-gray-800 border-none rounded-md text-gray-300 focus:ring-2 focus:ring-gray-600 mb-4"
            />
            <Button onClick={() => setActiveStep(2)} className="w-full py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">Next</Button>
          </div>
        )
      case 2:
        return (
          <div>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-4 bg-gray-800 border-none rounded-md text-gray-300 focus:ring-2 focus:ring-gray-600 mb-4">
              <option value="" disabled>Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </Select>
            <div className="flex space-x-4">
              <Button onClick={() => setActiveStep(1)} className="flex-1 py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">Previous</Button>
              <Button onClick={() => setActiveStep(3)} className="flex-1 py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">Next</Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <Select value={boilerplate} onChange={(e) => setBoilerplate(e.target.value)} className="w-full p-4 bg-gray-800 border-none rounded-md text-gray-300 focus:ring-2 focus:ring-gray-600 mb-4">
              <option value="" disabled>Select Boilerplate</option>
              <option value="React">React</option>
              <option value="Next.js">Next.js</option>
              <option value="Vue">Vue</option>
            </Select>
            <div className="flex space-x-4">
              <Button onClick={() => setActiveStep(2)} className="flex-1 py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">Previous</Button>
              <Button onClick={() => alert('Room Created!')} className="flex-1 py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">Create Room</Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      <h2 className="text-3xl font-light text-gray-200">Create Room</h2>
      {renderStep()}
    </div>
  )
}

export default CreateRoom
