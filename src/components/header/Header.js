"use client";

import Image from "next/image";
import NavBarSSR from "./NavBarSSR";
import NavBarCSR from "./NavBarCSR";
import { createContext, useContext, useEffect, useState } from "react";
import { useScrollYContext } from "@/app/context/ScrollYContext";


const Header = () => {
	// Funcionalidad para reducir el Header al hacer scrolldown
	const {scrollingY} = useScrollYContext();

	return (
		<header
			className={`w-100 mt-2 fixed top-0 z-3 shadow-md -translate-y-2 d-flex flex-col align-items-center ${
				scrollingY ? "h-24" : "h-60"
			} transition-all ease-linear duration-100`} style={{backgroundColor: "rgba(230, 219, 193, 1)"}}
		>
			<div className="d-flex justify-center">
				<Image
					src={"/images/inkubooklogo.png"}
					width={1000}
					height={1000}
					alt={"Company logo"}
					className={`${scrollingY ? "h-0 w-0" : "h-44 w-44"} transition-all ease-linear duration-100`}
				/>
			</div>
			<nav className={`flex flex-row gap-5 justify-between pt-2 pb-0 px-3 w-11/12 ${scrollingY?"translate-y-3":"-translate-y-4"}`} >
				<NavBarSSR />
				<NavBarCSR />
			</nav>
		</header>
	);
};

export default Header;
