"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Balance from "../User/Balance";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleReCaptcha from "react-google-recaptcha";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async () => {
    // Reset error and start submission
    setError("");
    setIsSubmitting(true);
    setSubscriptionSuccess(false);

    // Validate inputs
    if (!email) {
      setError("Email is required");
      setIsSubmitting(false);
      return;
    }
    if (!terms) {
      setError("You must accept terms and conditions");
      setIsSubmitting(false);
      return;
    }
    if (!captchaToken) {
      setError("Please complete the robot verification");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/user/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, terms, captcha: captchaToken }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      // Handle successful subscription
      setSubscriptionSuccess(true);

      // Reset form
      setEmail("");
      setTerms(false);
      setCaptchaToken("");

      // Close the modal after 2 seconds
      setTimeout(() => {
        setShowSubscribeDialog(false);
        setSubscriptionSuccess(false);
      }, 2000);
    } catch (err: any) {
      // Handle error
      setError(err.response?.data || "Subscription failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="dark-theme relative flex items-center min-w-screen">
        <ul className="desktopMenu p-4 w-full h-20 gap-4 lg items-center justify-between sm:flex">
          <li className="flex gap-8 justify-between items-center">
            <Link href="/">
              <span className="items-center gap-2 flex">
                <span className="logo material-symbols-outlined">
                  <Image
                    alt={"logo"}
                    width={32}
                    height={32}
                    src="/graphic_icon.jpg"
                    className={"icon rounded-full"}
                  />
                </span>
                <span className="hidden md:flex">Last Bloodlines</span>
              </span>
            </Link>
            <Link href="/faucet" className="px-4 py-2">
              Claim
            </Link>
            <Link href="/mint" className="px-4 py-2">
              Releases
            </Link>
            <Link href="/about" className="px-4 py-2">
              About
            </Link>
            <Button
              className="hover:bg-transparent bg-transparent text-md"
              onClick={() => setShowSubscribeDialog(true)}
            >
              Subscribe
            </Button>
            {showSubscribeDialog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md mx-4 relative text-white">
                  <button
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                    onClick={() => setShowSubscribeDialog(false)}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>

                  {subscriptionSuccess ? (
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-5xl text-green-500"
                        />
                      </div>
                      <h2 className="text-xl font-semibold mb-2 text-white">
                        Subscription Successful!
                      </h2>
                      <p className="text-zinc-300">
                        You've been subscribed to our newsletter.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        Subscribe to our newsletter
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-zinc-300">
                            Enter your email address
                          </Label>
                          <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={terms}
                            onCheckedChange={(checked) =>
                              setTerms(checked === true)
                            }
                            className="border-zinc-700 bg-zinc-800 data-[state=checked]:bg-white data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium text-zinc-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accept terms and conditions
                          </label>
                        </div>

                        <GoogleReCaptcha
                          sitekey="6LcDnI0qAAAAAHtR0Iw5Kha1qV_WnXtpsR7oi4Mo"
                          onChange={handleCaptchaChange}
                        />

                        {/* Error message display */}
                        {error && (
                          <div className="text-red-400 text-sm mt-2">
                            {error}
                          </div>
                        )}

                        <Button
                          className="w-full bg-white text-black hover:bg-zinc-200"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </li>
          <li className="flex gap-1 w-fit justify-end self-center">
            <Balance />
          </li>
        </ul>

        <ul className="mobileMenu bg-black flex p-3 w-full items-center justify-between">
          <li
            onClick={() => setShowMenu((prev) => !prev)}
            className="w-1/4 pt-1 ml-3 cursor-pointer"
          >
            <span className="menu material-symbols-outlined">
              <FontAwesomeIcon icon={showMenu ? faClose : faBars} />
            </span>
          </li>
          <li className="mx-auto w-fit">
            <Balance />
          </li>
          <li className="w-1/4 pt-1 ta-r">
            <Link href={"/"}>
              <span className="logo material-symbols-outlined">
                <Image
                  alt={"logo"}
                  width={32}
                  height={32}
                  src="/graphic_icon.jpg"
                  className={"icon"}
                />
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Conditionally render dropdown based on showMenu state */}
      <ul
        className={`${
          showMenu ? "" : "hideMenu"
        } mobileMenu bg-black w-full origin-top hover:shadow-lg transition-all duration-300 absolute z-10 top-15 flex-col gap-3 nav-menu p-4`}
      >
        <li className="mt-4">
          <Link
            onClick={() => setShowMenu(false)}
            href="/faucet"
            className="px-2"
          >
            Claim
          </Link>
        </li>
        <li className="mt-4">
          <Link
            onClick={() => setShowMenu(false)}
            href="/mint"
            className="px-2"
          >
            Mint
          </Link>
        </li>
        <li className="mt-4">
          <Link
            onClick={() => setShowMenu(false)}
            href="/about"
            className="px-2"
          >
            About
          </Link>
        </li>
        <li className="mt-4">
          <Balance />
        </li>
      </ul>
    </>
  );
}
