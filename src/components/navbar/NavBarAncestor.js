import Link from "next/link";
import LapizIcon from "@/components/iconos/Lapiz";
import PencilCaseIcon from "@/components/iconos/PencilCase";
import AgendaIcon from "@/components/iconos/Agenda";
import Image from "next/image";
import NavBarSSR from "./NavBarSSR";
import NavBarCSR from "./NavBarCSR";

const NavBarAncestor = () => {
	return (
		<nav className="flex flex-row gap-5 justify-between p-6 bg-black">
			<NavBarSSR/>
            <NavBarCSR/>
		</nav>
	);
};

export default NavBarAncestor;