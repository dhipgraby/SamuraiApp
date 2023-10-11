'use client'
import { usePersonStore } from "@/store/nameStore"
import { userStore } from "@/store/user"

export default function Store() {

    const firstName = usePersonStore((state) => state.firstName)
    const updateFirstName = usePersonStore((state) => state.updateFirstName)
    const userBalance = userStore((state) => state.tokenBalance)

    return (
        <div>
            <div className={"ta-c"}>
                <h1 className="text-3xl font-bold underline mb-3">
                    Test Store with Zustand
                </h1>
                <p>
                    Store is a great way to share variables with persistance value around your app.
                    <br />
                    Given example is setting up a name
                </p>

                <div className="box text-left">
                    <h1>User data:</h1>
                    <p>Token balance: {userBalance}</p>

                    <p className="mt-4">
                        User name:
                    </p>
                    <input
                        onChange={(e) => updateFirstName(e.currentTarget.value)}
                        value={firstName}
                        className="p-1 rounded block my-2 text-black"
                    />
                    <p>Welcome: {firstName}!</p>
                </div>

            </div>
        </div>
    )
}
