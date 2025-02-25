"use client ";

import { useMyPresence, useOther, useOthers } from "@liveblocks/react/suspense";
import React from "react";
import { CursorPos } from "readline";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
    const [myPresence,updatePresence] = useMyPresence(); // use to the detect the presence of the user  and update their realtime coordinate of the cursor 
    const others = useOthers();  // Returns an array with information about all the users currently connected in the room (except yourself).

    

    const OnpointerMove = (e : React.PointerEvent<HTMLDivElement>)=>{
        const cursor = {
            x : Math.floor(e.pageX),
            y : Math.floor(e.pageY),
        }
        updatePresence({cursor})
    }

    const OnpointerLeave = ()=>{
        updatePresence({cursor : null}); // when the user leaves it the position of the cursor of the user disappear , 
    }

  return <div onPointerMove={OnpointerMove} 
  onPointerLeave={OnpointerLeave}>
    {others.filter((other)=> other.presence.cursor!==null).map(({presence,connectionId,info})=>(
            <FollowPointer key ={connectionId} info={info} x={presence.cursor!.x} y={presence.cursor!.y}/>
    ))}
    {children}
  </div>;
}

export default LiveCursorProvider;
