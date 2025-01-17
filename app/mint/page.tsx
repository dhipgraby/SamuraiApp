"use client";
import { TestNfts } from "@/data/nfts";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface NftsProps {
  id: string;
  release: string;
  img: string;
  owner: string;
}

interface StatusProps {
  nftId: string;
  releaseDate: Date;
  isMinted: boolean;
  mintDate: Date;
}

export default function Mint() {
  const Nfts: NftsProps[] = TestNfts;

  const {
    data: status,
    isLoading,
    isError,
  } = useQuery<StatusProps[]>({
    queryKey: ["nft-status"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3003/nfts/status");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-xl font-bold text-red-500">Error loading data</h1>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  // Calculate releaseStatus and group NFTs
  const categorizedNfts = Nfts.map((el) => {
    const currentStatus = status?.[parseInt(el.id) - 1];
    const releaseDateS = currentStatus?.releaseDate;
    const isMinted = currentStatus?.isMinted;
    let releaseStatus = 3;

    if (releaseDateS) {
      const daysSinceRelease = Math.floor(
        (new Date().getTime() - new Date(releaseDateS).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (daysSinceRelease < 7) {
        releaseStatus = 1;
      } else if (daysSinceRelease < 14) {
        releaseStatus = 2;
      }
    }
    const releaseDate = releaseDateS ? new Date(releaseDateS) : new Date(0);

    return {
      ...el,
      isMinted,
      releaseStatus,
      releaseDate,
    };
  });

  const groupedNfts = {
    thisWeek: categorizedNfts.filter((nft) => nft.releaseStatus === 1),
    lastWeek: categorizedNfts.filter((nft) => nft.releaseStatus === 2),
    older: categorizedNfts.filter((nft) => nft.releaseStatus === 3),
  };

  const renderNfts = (nfts: typeof categorizedNfts) =>
    nfts.map((el) => (
      <div
        key={el.id}
        className="relative my-3 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
      >
        <article className="overflow-hidden">
          <a href={`/mint/${el.id}`}>
            <Image
              priority={true}
              width={100}
              height={100}
              sizes={"max-width:100%"}
              alt="bloodline"
              className="block h-auto w-full rounded-lg shadow-lg"
              src={`/nfts/${el.img}`}
            />
          </a>

          {/* Show Badge if Minted */}
          {el.isMinted && (
            <Badge className="absolute bottom-[4.5rem] right-5 bg-green-500 text-white">
              Minted
            </Badge>
          )}

          <div className="box">
            <header className="flex items-center justify-between leading-tight">
              <h1 className="text-md">
                <a
                  className="no-underline hover:underline text-white"
                  href={`/mint/${el.id}`}
                >
                  Bloodline: <span className="text-yellow-400">#{el.id}</span>
                </a>
              </h1>
              <p className="text-grey-darker text-sm">
                {el?.releaseDate &&
                  el.releaseDate
                    .toLocaleDateString("en-GB")
                    .replace(
                      /(\d{2})\/(\d{2})\/(\d{4})/,
                      (_, day, month, year) =>
                        `${day}/${month}/${year.slice(2)}`
                    )}
              </p>
            </header>
          </div>
        </article>
      </div>
    ));

  return (
    <div>
      <div className={"text-center"}>
        <h1 className="text-3xl font-bold underline mb-3">
          Bloodlines Releases
        </h1>
        <small className="text-yellow-400">Get a unique Bloodline NFT</small>

        <div className="container my-12 mx-auto px-4 md:px-12">
          <h2 className="text-xl font-bold mb-3">This Week</h2>
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {renderNfts(groupedNfts.thisWeek)}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3">Last Week</h2>
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {renderNfts(groupedNfts.lastWeek)}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3">Older</h2>
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {renderNfts(groupedNfts.older)}
          </div>
        </div>
      </div>
    </div>
  );
}
