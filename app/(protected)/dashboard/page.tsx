"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/logout";

export default function Dashboard() {


    return (
        <div className="my-8 ta-c">

            <h1>Welcome to Lastbloodlines</h1>

            <Button className="bg-yellow-400 text-black rounded-full h-[36px] mt-8" onClick={() => logout()}>
                Logout
            </Button>

        </div>

    )
}