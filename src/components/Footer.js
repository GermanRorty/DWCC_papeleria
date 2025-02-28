'use client';

import { useScrollYContext } from "@/app/context/ScrollYContext";


export default function Footer() {
      const { scrollingY } = useScrollYContext(); 
  
    return (
      <footer className={`footer bg-dark z-45 text-white py-3 mt-auto z-48`}>
        <div className="footer-content d-flex justify-content-center gap-4">
          <p>&copy; {new Date().getFullYear()} Inkubook</p>
          <p>Created by German Rodriguez Marty</p>
        </div>
      </footer>
    );
  }
  