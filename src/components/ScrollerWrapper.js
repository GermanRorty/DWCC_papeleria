'use client';

const { useScrollYContext } = require("@/app/context/ScrollYContext");

const ScrollerWrapper = ({ children }) => {
    const { scrollingY } = useScrollYContext(); 
    return (
      <div className={`d-flex flex-col ${scrollingY?"h-full top-1/3 translate-y-48":"h-3/4 translate-y-60"} transition-all duration-300`}>
      {/* <div className={`p-4 ${scrollingY? "" : "h-4/5 translate-y-64"}`}> */}
        {children}
      </div>
    );
  };

  // return <div className={`p-4 flex-grow-1 overflow-auto`}>{children}</div>;


  export default ScrollerWrapper;