'use client'
import { useState } from "react"

import { CheckCircle2 } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert" 
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Home() {

  const [text, setText] = useState("")
  const [arr, setArr] = useState<string[]>([])
  const [alert, setAlert] = useState("")
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleAdd = () => {
    if (!text.trim()) return
    setArr((prev) => [text, ...prev])
    setText("")
    setAlert("success")
    setTimeout(() => setAlert(""), 3000)
  }

  const handleDelete = (index: number) => {
    setDeletingId(index)
    setAlert("delete")
    setTimeout(() => setAlert(""), 3000)
    setTimeout(() => {
      setArr((prev) => prev.filter((_, i) => i !== index))
      setDeletingId(null)
    }, 300)
  }


  return (
    <div className="min-h-screen text-gray-100 font-sans antialiased p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="min-h-14 relative overflow-hidden mb-8">
          <Alert className={"transition-all duration-300 border-0 absolute w-full rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30 font-medium " + (alert === "success" ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0 pointer-events-none")}>
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            <AlertTitle className="text-sm font-semibold">Note Added</AlertTitle>
          </Alert>
          <Alert className={"transition-all duration-300 border-0 absolute w-full rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30 font-medium " + (alert === "delete" ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0 pointer-events-none")}>
            <CheckCircle2 className="h-5 w-5 shrink-0 text-rose-400" />
            <AlertTitle className="text-sm font-semibold">Note Deleted</AlertTitle>
          </Alert>
        </div>

        <div className="flex flex-col rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/20 ring-1 ring-gray-800 my-8 gap-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your note here..."
            className="min-h-28 resize-y text-[15px] leading-relaxed bg-gray-950 border-gray-800 focus:border-emerald-500/60 focus:ring-emerald-500/20 placeholder:text-gray-500 text-gray-100 rounded-xl"
          />
          <Button
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 rounded-xl transition-colors"
            onClick={() => handleAdd()}
          >
            Add Note
          </Button>
          <p className="text-xs text-gray-500 mx-1 font-medium">Click on any note to delete it</p>
        </div>

        <div className="flex flex-wrap flex-row gap-3">
          {
            arr.map((e, i) => (<span
              key={i}
              className={"transition-all duration-300 px-5 py-3 cursor-pointer min-h-12 w-auto whitespace-pre-wrap break-words inline-flex items-center justify-center rounded-xl ring-1 origin-center text-[15px] leading-relaxed font-medium " + (deletingId === i
                ? "scale-0 opacity-0 -rotate-6 bg-rose-500/15 ring-rose-500/40 text-rose-400"
                : "scale-100 opacity-100 rotate-0 bg-gray-900 ring-emerald-500/20 text-gray-200 hover:ring-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400 hover:scale-105"
              )}
              onClick={() => handleDelete(i)}
              >{e}</span>))
          }
        </div>
      </div>
    </div>
  );
}
