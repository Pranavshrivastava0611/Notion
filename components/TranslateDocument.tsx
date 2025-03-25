"use client"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog';
import React from 'react'
import * as Y from "yjs";
import { Button } from './ui/button';
import { DialogHeader } from './ui/dialog';
import { useState } from 'react';
import { useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

function TranslateDocument({doc} : {doc : Y.Doc}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [language, setLanguage] = useState<string>("english");
    const [summary,setSummary] = useState("");
    const [question, setQuestion] = useState("");

    const handleAskQuestion = async ( e: React.FormEvent) => {
        e.preventDefault();
        console.log("BASE URL: ", process.env.NEXT_PUBLIC_BASE_URL);

        startTransition(async ()=>{
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
              method : "POST",
              headers : {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                documentData : documentData , 
                targetLang : language
              })
            })

            if(res.ok){
              const {translated_text} = await res.json();

              setSummary(translated_text);
              toast.success("Translated Summary Successfully");

            }else{
              console.log("chud gye guru")
            }
        })
    };
               

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant={"outline"} asChild>
        {/*as child is used to wrap the button around the dialog trigger */}
        <DialogTrigger className='flex justify-between gap-2'><LanguagesIcon/>Translate</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a Language and AI will translate a summary of the document in the selected language.
          </DialogDescription>

          <hr  className='mt-5'/>

          {question && <p className='mt-5 text-gray-500'> Q: {question}</p>}
        </DialogHeader>

        <form onSubmit={handleAskQuestion} className="flex  gap-2">
          <Select value={language} onValueChange={(value)=>setLanguage(value)}> 
            <SelectTrigger className='w-full'>
              <SelectValue  placeholder="Select a Language"/>
            </SelectTrigger>

            <SelectContent>
              {languages.map((language)=>(
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
         
          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDocument
