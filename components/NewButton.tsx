'use client'

import React from 'react'
import { Button } from './ui/button'
import { db } from '@/Firebase'
import { adminDb,adminapp } from '@/firebase-admin'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {createNewUser} from '../actions/action'


function NewButton() {
  const [isPending,startTransition] = useTransition(); // can ne used in place of async function 
  const router = useRouter();


  const handleCreateNewuser = ()=>{
      startTransition(async ()=>{
      const {docId} =  await createNewUser();
      router.push('/doc/'+`${docId}`);
        

      });
  }
  return (
    <div>
    <Button onClick={handleCreateNewuser} disabled={isPending}>{isPending ? 'creating..' : 'New Document'}</Button>
    
    </div>
  )
}
export default NewButton
