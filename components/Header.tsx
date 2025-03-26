'use client'


import React from 'react'
import {SignedIn,SignInButton,SignOutButton,SignedOut,UserButton} from '@clerk/nextjs'
import { useUser } from '@clerk/clerk-react'
import Breadcrums from "./Breadcrums"

function Header() {
    const {user} = useUser();
  return (
    <div className='flex items-center justify-between flex-row p-5'>
     {user && <h1 className='text-2xl'>{user?.firstName}{"'s"} Space</h1>}

    {/* BreadCrumbs (Directory show in which directory we are )*/}
     <Breadcrums/>

     <div className=''>
        <SignedOut>
        <SignInButton/>
        </SignedOut>
        <SignedIn>
        <UserButton/>
        </SignedIn>
     </div>
    </div>
    
  )
}

export default Header
