'use client'

import React, { useState } from 'react'
import Document from '@/components/Document'


function page({params : {id}} : {
    params : {
        id : string,
    }
}) {
    console.log(id)

  return (
    <div className='flex flex-col flex-1 min-h-screen'>
    <Document id={id}/> {/* this will render the entire document based on the id received  */}
    </div>
  )
}

export default page
