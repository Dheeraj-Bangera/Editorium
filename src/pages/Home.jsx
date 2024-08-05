import React from 'react'
import JoinRoom from '../components/JoinRoom'
import CreateRoom from '../components/CreateRoom'
import { FaGithub } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-grow">
        <div className="w-1/2 flex flex-col items-center justify-center p-8 space-y-6">
          <JoinRoom />
        </div>
        <div className="relative flex items-center justify-center w-0">
          <div className="absolute inset-y-0 w-px bg-gray-700"></div>
          <span className="absolute px-4 text-2xl font-light text-gray-400 bg-gray-900">OR</span>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center p-8 space-y-6">
          <CreateRoom />
        </div>
      </div>
      <footer className="flex items-baseline justify-center py-2 text-gray-400">
        <span className="mr-2">Developed by</span>
        <a 
          href="https://github.com/your-github-username" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center text-gray-200 hover:text-gray-400"
        >
          <span>Dheeraj</span>
          <FaGithub className="ml-1" />
        </a>
      </footer>
    </div>
  )
}

export default Home
