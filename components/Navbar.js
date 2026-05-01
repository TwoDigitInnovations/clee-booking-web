"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { logout } from "../redux/actions/authActions";
import { loadUserFromStorage } from "../redux/slices/authSlice";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    router.push("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };



  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
         
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/lgo.png"
              alt="Clee Logo"
              className="h-8 w-auto md:h-10 md:w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-[#0A4D91] font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0A4D91] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isDarkMode ? "bg-[#04294E]" : "bg-[#1173D8]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                  isDarkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-[#04294E]" />
                ) : (
                  <Sun className="w-3 h-3 text-[#1173D8]" />
                )}
              </div>
            </button>

            {/* Profile Avatar or Start Now Button */}
            {isAuthenticated && user ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1173D8 0%, #04294E 100%)"
                }}
                title={user.name || user.email}
              >
                {getInitials(user.name)}
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-6 py-2.5 rounded-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #1173D8 0%, #04294E 100%)"
                }}
              >
                Start Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 text-[#04294E] ${
                  isOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
                size={24}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 text-[#04294E] ${
                  isOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
                size={24}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-lg">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#0A4D91] font-medium transition-all duration-300 transform ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Dark Mode Toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-gray-700 font-medium">Dark Mode</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isDarkMode ? "bg-[#04294E]" : "bg-[#1173D8]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                  isDarkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-[#04294E]" />
                ) : (
                  <Sun className="w-3 h-3 text-[#1173D8]" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Start Now Button or Profile */}
          <div className="px-4 pt-2">
            {isAuthenticated && user ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center justify-center gap-3 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1173D8 0%, #04294E 100%)"
                }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  {getInitials(user.name)}
                </div>
                <span>{user.name || user.email}</span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1173D8 0%, #04294E 100%)"
                }}
              >
                Start Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        userName={user?.name || user?.email}
      />
    </nav>
  );
}
