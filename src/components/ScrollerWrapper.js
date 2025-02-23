'use client';

const { useScrollYContext } = require("@/app/context/ScrollYContext");

const ScrollerWrapper = ({ children }) => {
    const { scrollingY } = useScrollYContext(); 
    return (
      <div className={`p-4 ${scrollingY?"h-fit translate-y-40":"h-3/4 translate-y-60"}`}>
      {/* <div className={`p-4 ${scrollingY? "" : "h-4/5 translate-y-64"}`}> */}
        {children}
      </div>
    );
  };

  export default ScrollerWrapper;