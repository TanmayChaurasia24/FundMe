import Image from "next/image"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ThreeDCardDemo } from "@/components/FansBgCard"
import { TailwindcssButtons } from "@/components/Paymentbutton"
import { PlaceholdersAndVanishInputDemo } from "@/components/Makepayment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"


export default function UsernamePage({username}:any) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        <Image
          src="/download.jpg"
          alt="Cover image"
          width={1920}
          height={350}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
          <Avatar className="h-28 w-28 border-4 border-white">
            <AvatarImage src="/download.jpg" alt={`@${username}'s avatar`} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 space-y-2">
        <h1 className="text-2xl font-bold">@{username}</h1>
        <p className="text-gray-400">creating animated art for VTT</p>
        <p className="text-gray-400">
          343,234 posts · $3,452/release · 2,342 members
        </p>
      </div>

      <div className="payments flex gap-5 w-[70%] mx-auto mb-2">
        <ThreeDCardDemo />
        <div className="flex flex-col h-[40vh] justify-center items-center mt-[275px]">
          <PlaceholdersAndVanishInputDemo />  
          <div className="flex justify-center items-center mt-5">
            <TailwindcssButtons />
          </div>
        </div>
      </div>
    </div>
  )
}