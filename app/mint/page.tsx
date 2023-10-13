'use client'
import { TestNfts } from "@/data/nfts";
import Image from "next/image";

interface NftsProps {
    id: string;
    release: string;
    img: string;
    owner: string;
}

export default function Mint() {

    const Nfts: NftsProps[] = TestNfts
    return (
        <div>            
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline mb-3">
                    Bloodlines Releases
                </h1>
                <small className="text-yellow-400">Get a unique Bloodline NFT</small>


                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {Nfts.map((el) =>
                            <div key={el.id} className="my-3 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                <article className="overflow-hidden">
                                    <a href={`/mint/${el.id}`}>
                                        <Image width={100} height={100} sizes={"max-width:100%"} alt="bloodline" className="block h-auto w-full rounded-lg shadow-lg" src={`/nfts/${el.img}`} />
                                    </a>

                                    <div className="box">
                                        <header className="flex items-center justify-between leading-tight">
                                            <h1 className="text-md">
                                                <a className="no-underline hover:underline text-white" href={`/mint/${el.id}`}>
                                                    Bloodline: <span className="text-yellow-400">#{el.id}</span>
                                                </a>
                                            </h1>
                                            <p className="text-grey-darker text-sm">
                                                {el.release}
                                            </p>
                                        </header>
                                    </div>
                                </article>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
