import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="bg-[#eaeff5] rounded-2xl flex items-center justify-between p-5">
        <Link
          to="/"
          className="font-semibold flex justify-center items-center gap-2 rounded-2xl bg-white px-5 py-2"
        >
          <FaCanadianMapleLeaf />
          gaurav
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex">
          <ul className="flex gap-5 items-center justify-center">
            {navLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-2xl transition-colors ${isActive
                      ? "bg-[#058155] text-white"
                      : "hover:bg-gray-200"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="tel:+919671260908"
          className="rounded-2xl hidden lg:flex bg-[#058155] text-white px-5 py-2 hover:bg-green-800 transition-colors"
        >
          Let's Talk
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="rounded-xl bg-white p-2 lg:hidden"
          aria-label="Open menu"
        >
          <RiMenu3Line className="cursor-pointer" size={20} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* 👇 Mobile menu ko bhi original 'w-full' kar diya hai */}
          <div
            className="fixed top-0 right-0 h-full w-full bg-white z-50 p-8 flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end p-2"
              aria-label="Close menu"
            >
              <RiCloseLine className="cursor-pointer" size={24} />
            </button>
            <nav>
              <ul className="flex flex-col gap-6 text-xl">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-green-700"
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href="tel:+919671260908"
              className="mt-auto w-full text-center rounded-xl bg-[#058155] text-white px-5 py-3 hover:bg-green-800 transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </>
  );
}