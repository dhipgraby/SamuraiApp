"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign, faGift } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface FaucetStatus {
  hours: number;
  minutes: number;
  seconds: number;
}

const HARDCODED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhY2hwbGF5ejk5OSIsImlkIjo0LCJpYXQiOjE3MzU0MjMxMTIsImV4cCI6MTczNTQ5NTExMn0.8amLLDKcpzRboqQV8Q0J-5Xch1VRpCl4DymHQ31BX9o";
const API_BASE_URL = "http://localhost:3002";

export default function FaucetPage() {
  const [faucetStatus, setFaucetStatus] = useState<FaucetStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const checkFaucet = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/check-faucet`, {
          headers: {
            Authorization: `Bearer ${HARDCODED_TOKEN}`,
          },
        });
        const data: FaucetStatus = await response.json();
        setFaucetStatus(data);
      } catch (error) {
        console.error("Error checking faucet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkFaucet();
    const interval = setInterval(checkFaucet, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const claimTokens = async () => {
    setIsClaiming(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/claim`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HARDCODED_TOKEN}`,
        },
      });
      if (response.ok) {
        // Reset faucet status after successful claim
        setFaucetStatus({ hours: 24, minutes: 0, seconds: 0 });
      } else {
        console.error("Failed to claim tokens");
      }
    } catch (error) {
      console.error("Error claiming tokens:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const isButtonDisabled =
    faucetStatus &&
    (faucetStatus.hours > 0 ||
      faucetStatus.minutes > 0 ||
      faucetStatus.seconds > 0);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className="container mx-auto p-6 font-mono">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faYenSign} className="text-yellow-400" />
          <span className="font-mono">Claim Free Tokens</span>
        </h1>
        <small className="text-gray-400">
          Get free Yen tokens each 24 hours
        </small>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Protocol Info Box */}
        <div className="border border-gray-700 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2">Protocol Info</h2>
            <p className="text-lg">
              Welcome to <span className="text-yellow-400">LastBloodLines</span>
            </p>
          </div>
        </div>

        {/* Faucet Explanation Box */}
        <div className="border border-gray-700 rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Faucet Explanation</h2>
          <div className="space-y-4">
            <p className="text-lg">Come claim free Yen Token every 24 hours.</p>
            <p className="text-lg">
              You can redeem <span className="text-yellow-400">YEN Token</span>{" "}
              with Free Yen Token.
            </p>
            <p className="text-lg">
              Additionally you can stake in the{" "}
              <span className="text-yellow-400">Yen Pools</span> to increase
              your earnings
            </p>
            <p className="text-lg">Refer your friends to earn more</p>
          </div>
        </div>
      </div>

      {/* Gift Box Section */}
      <div className="border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex justify-center">
            <Image
              width={300}
              height={300}
              src="/icons/rewardblackbox.png"
              alt="yengold"
            />
          </div>
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
          ) : (
            <>
              {isButtonDisabled ? (
                <div className="text-yellow-500 text-xl mb-4">
                  Next claim in: {formatTime(faucetStatus!.hours)}:
                  {formatTime(faucetStatus!.minutes)}:
                  {formatTime(faucetStatus!.seconds)}
                </div>
              ) : null}
              <button
                onClick={claimTokens}
                disabled={isButtonDisabled || isClaiming}
                className={`bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-md transition-colors flex items-center gap-2 ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isClaiming ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                ) : (
                  <>
                    <span>Claim 1,000 Yen Tokens</span>
                    <FontAwesomeIcon icon={faGift} />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
