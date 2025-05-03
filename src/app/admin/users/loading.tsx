import Spinner from '@/app/profile/_components/Spinner'
import React from 'react'

function Loader() {
  return (
    <div className='h-[80vh] flex items-center justify-center'>
        <Spinner />
    </div>
  )
}

export default Loader