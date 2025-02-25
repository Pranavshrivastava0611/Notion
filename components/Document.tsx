"use client";

import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase";
import { title } from "process";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";

function Document({ id }: { id: string }) {
    const [input , setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();
    const [data,loading,error] = useDocumentData(doc(db,"Documents",id));
    const isOwner = useOwner();
    console.log("ownerr",isOwner);
    useEffect(()=>{
        setInput(data?.title)
    },[data])

    const updateTitle = (e : FormEvent)=>{
        e.preventDefault();

        if(input.trim()){
        startTransition(async ()=>{
            
            await updateDoc(doc(db,"Documents",id),{
                title : input,
            })
        })
    }
    }
  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto pb-5 justify-between">
        <form action="" method="" onSubmit={updateTitle} className="flex flex-1  space-x-2">
          <Input  value={input}  onChange={(e)=> setInput(e.target.value)} className="font-semibold text-base py-4 px-5"/>
          <Button disabled={isUpdating} type="submit">{isUpdating ? "Updating ..." : "Update"}</Button>

          {
            isOwner && (
              <>
              <p>I am the owner</p>
              </>
            )
          }
        </form>
      </div>

      <div>
        {/*manage user  */}

        {/* avatars of the users  */}
      </div>

      <div>{/*collabortive work  */}
        <Editor/>
      </div>
    </div>
  );
}

export default Document;
