import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
    return (
        <div className="m-auto mt-20">
            <Link href="/">
                <Image className="m-auto" alt="katarilogo" src="/katarilogo.png" height={64} width={200} />
            </Link>
        </div>
    );
};

export default Logo;
