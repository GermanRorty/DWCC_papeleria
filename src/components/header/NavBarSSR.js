import Link from "next/link";
import PencilCaseIcon from "@/components/iconos/PencilCase";
import Image from "next/image";
import { useSession } from "next-auth/react";

const NavBarSSR = () => {
	return (
		<ul className="d-flex flex-row justify-content-center align-items-center m-0 p-0 gap-5">
			<li className="d-flex flex-row">
				<Link href="/" className="btn d-flex align-items-center p-1 pe-3">
					<Image alt="Ink logomark" src="/images/InkBottle-logo.svg" width={500} height={500} className="w-14"></Image>
					<div>Home</div>
				</Link>
			</li>
			<li className="flex items-center">
				<Link href="/Productos" className="btn d-flex align-items-center p-1 pe-3">
					<Image alt="pencilcase logomark" src="/images/pencilcaseicon.svg" width={500} height={500} className="w-14"></Image>
					<div>Productos</div>
				</Link>
			</li>
		</ul>
	);
};

export default NavBarSSR;
