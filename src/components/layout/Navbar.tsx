/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="relative bg-gray-800 rounded-4xl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex gap-5">
            {/* logo */}
            <div>logo</div>
            {/* links */}
            <div>links</div>
          </div>
          {/* auth */}
          <div>auth</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
