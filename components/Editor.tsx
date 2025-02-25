"use client"

import { useRoom, useSelf } from '@liveblocks/react/suspense'
import React, { useEffect, useState } from 'react'
import * as Y from "yjs"
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { MoonIcon, SunIcon } from 'lucide-react'
import {BlockNoteView} from "@blocknote/shadcn"
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import stringToColor from '@/lib/stringToColor'

type EditorProps = {
  doc : Y.Doc;
  provider : any;
  DarkMode : boolean;

}
function BlockNote({doc,provider,DarkMode} : EditorProps) {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: userInfo.name,
        color: stringToColor(userInfo?.email),
      },
    },
  });
  return (
    <div className='relative max-w-6xl mx-auto'>
      <BlockNoteView   theme={DarkMode ? "dark" : "light"} className='min-h-screen' />
    </div>
  )
}

function Editor() {
 const room = useRoom();
const [doc,setDoc] = useState<Y.Doc>();
const [provider,setProvider] = useState<LiveblocksYjsProvider>();
const [darkmode,setDarkMode] = useState(false);
const style = `hover:text:white ${
darkmode ? "text-gray-300 bg-gray:700 hover:bg-gray-100 hover:text-gray-700" : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"}`

useEffect(()=>{
  const ydoc = new Y.Doc() // this is the structure in which out collaboartive data will be stored in the data store in the liveblock
  const YProvider = new LiveblocksYjsProvider(room,ydoc);
  setDoc(ydoc)
  setProvider(YProvider);

  return ()=>{
    ydoc?.destroy();
    YProvider?.destroy();
  }

},[room])

if(!doc || !provider){
  return null;
}
  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex gap-2 items-center justify-end mb-10'>
        {/*Translate Document  */}
        {/*chattoDocument AI */}
        {/*Dark mode */}
        <button className={style} onClick={()=>{
          setDarkMode(!darkmode);
        }}>
        {darkmode ? <SunIcon/> : <MoonIcon/>}
        </button>
      </div>

      <div>
        {/*Blocknote  */}
        <BlockNote doc={doc} provider = {provider} DarkMode={darkmode}/>
        
      </div>
    </div>
  )
}

export default Editor
