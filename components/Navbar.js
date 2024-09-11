"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            href={"/"}
            className="text-white text-2xl font-bold flex justify-center items-center gap-2 mb-11 md:mb-0"
          >
            <Image className="mb-2" src="/tea.gif" alt="Tea" width={25} height={25} />
            <span>GetMeAChai</span>
          </Link>
        </div>
        <div className="relative">
          {session && (
            <>
              <button
                onClick={() => setshowdropdown(!showdropdown)}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="mt-20 -ml-20 md:mt-0 md:-ml-0 mx-4 text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Welcome {session.user.email}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[23px] top-[135px] md:left-[150px] md:top-12 bg-slate-700 text-white rounded-lg shadow w-44`}
                onMouseLeave={() => setshowdropdown(false)} // Close dropdown only when mouse leaves
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 text-white hover:bg-gray-500 dark:hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 text-white hover:bg-gray-500 dark:hover:text-white">
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link href="/"
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-white hover:bg-gray-500 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!session && (
            <Link href="/login">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
