'use client'
import Navbar from "@/components/navigation";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={"text-center"}>
        <h1 className="text-3xl font-bold underline mb-3">
          Welcome to The Samurai Protocol
        </h1>
        <small className="text-yellow-400">Empowering the Art concept inside Blockchain</small>

        <div className="flex mainImgContainer reflect-box">
          <div className="frontImg w-1/5"></div>
          <div className="frontImg w-1/5"></div>
          <div className="frontImg w-1/5"></div>
          <div className="frontImg w-1/5"></div>
          <div className="frontImg w-1/5"></div>
        </div>
      </div>
    </div>
  )
}
