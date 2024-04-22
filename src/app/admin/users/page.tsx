import Header from '@/components/ui/header/Header'
import React from 'react'

const Users: React.FC = () => {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-green-900'>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">User Dashboard</h1>
         
        </div>
      </Header>
      </div>
  )
}

export default Users;