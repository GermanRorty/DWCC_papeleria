import Link from "next/link";
import PencilCaseIcon from "@/components/iconos/PencilCase";
import Image from "next/image";
import { useSession } from "next-auth/react";

const NavBarSSR = () => {


	return (
			<ul className="flex flex-row gap-5">
				<li>
					<Link href="/">
						<Image alt="Ink logomark" src="images/InkBottle-logo.svg" width={500} height={500} className="w-14"></Image>
					</Link>
				</li>
				<li className="flex items-center">
					<Link href="/productos" className="flex gap-2 items-center">
						<div>Productos</div>
						<div className="w-9 h-auto">
							<PencilCaseIcon />
						</div>
					</Link>
				</li>
			</ul>
			
	);
};

export default NavBarSSR;