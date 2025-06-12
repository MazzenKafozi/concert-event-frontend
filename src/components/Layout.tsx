
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { useTheme } from "./ui/theme-provider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isHome = location.pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#121212]" : "bg-gray-50"}`}>
      <Header transparent={isHome && !isScrolled} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-venue-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-venue-200">Concert Ticket Vista</h3>
              <p className="text-gray-300">The ultimate destination for live music experiences.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-venue-200">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                <li><Link to="/events" className="text-gray-300 hover:text-white transition">Events</Link></li>
                <li><Link to="/venues" className="text-gray-300 hover:text-white transition">Venues</Link></li>
                <li><Link to="/booking" className="text-gray-300 hover:text-white transition">Book Tickets</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-venue-200">Subscribe</h3>
              <p className="text-gray-300 mb-4">Get the latest updates on events and exclusive offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md flex-grow bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-venue-500"
                />
                <button
                  type="submit"
                  className="bg-venue-500 hover:bg-venue-700 text-white px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2025 Concert Ticket Vista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
