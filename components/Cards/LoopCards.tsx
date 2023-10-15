import PoolCard from "./PoolCard"
import Input from "../Inputs/Input"
import { pools } from "@/data/pools"

export default function LoopCards() {

    return (
        <div className="container w-fit my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap justify-center">
                {pools.map((pool) => (
                    <div key={pool.index} className="m-4">
                        <PoolCard {...pool} />
                        <Input
                            text={"Stake Yen"}
                            type={"number"}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
