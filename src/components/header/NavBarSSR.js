import Link from "next/link";
import PencilCaseIcon from "@/components/iconos/PencilCase";
import Image from "next/image";
import { useSession } from "next-auth/react";

const NavBarSSR = () => {
	return (
		<ul className="d-flex flex-row justify-content-center align-items-center m-0 p-0 gap-5">
			<li className="d-flex flex-row">
				<Link href="/">
					<Image alt="Ink logomark" src="images/InkBottle-logo.svg" width={500} height={500} className="w-14"></Image>
				</Link>
			</li>
			<li className="flex items-center">
				<Link href="/productos" className="d-flex flex-col gap-2 items-center">
					<Image alt="pencilcase logomark" src="images/pencilcaseicon.svg" width={500} height={500} className="w-14"></Image>
				</Link>
			</li>
		</ul>
	);
};

export default NavBarSSR;
