'use server';
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { User } from "../types/types";
import { Merge } from "lucide-react";

  // this indicate that the this is a server action and it is very powerfull4


export async function createNewUser() {
    //if the user is not logged in we want the user to be sent to the login  page for that we use Auth form clek next.js
    await  auth.protect() // if the user is not looged in it will redirect to login
    const {sessionClaims} = await auth();
    const docCollectionRf = adminDb.collection("Documents");
    const docRef = await  docCollectionRf.add({
        title : "New Document"
    })
    adminDb.collection("User").doc(sessionClaims?.email!).collection("rooms").doc(docRef.id).set({
       UserId : sessionClaims?.email!,
       role : "Owner",
       CreatedAt : new Date(),
       roomId : docRef.id,
    })

    

    return {docId : docRef.id}
    
}




