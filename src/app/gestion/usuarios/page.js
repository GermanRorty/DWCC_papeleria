// app/usuarios/gestion

"use client";

import { getAllUsers } from "@/lib/services/users";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AddUserButton = () => {
	return (
		<Link href={"/Gestion/Usuarios/Alta"} className="link-hover-addentitybutton position-absolute right-4 -translate-y-16 w-fit h-fit p-0 m-0">
			<i className="bi bi-plus-square w-full fs-2 h-full m-0 p-0"></i>
		</Link>
	);
};

const UserPanel = ({ user }) => {
	return (
		<Link href={`/Gestion/Usuarios/${user.id}`} className="user-panel btn border rounded d-flex flex-col align-items-center p-4 shadow">
			{user.rol === "admin" && <Image src={"/images/users_rols/admin-icon.svg"} width={100} height={100} alt={"admin icon"}></Image>}
			{user.rol != "admin" && <Image src={"/images/users_rols/common-user-icon.svg"} width={100} height={100} alt={"admin icon"}></Image>}
			<div className="mt-3">
				<div>ID: {user.id}</div>
				<div>Nombre: {user.name}</div>
				<div>Email: {user.email}</div>
			</div>
		</Link>
	);
};

const UsersGrid = ({ users }) => {
	if (!users) return <div>Loading...</div>;

	return (
		<div className=" grid grid-cols-5 gap-5 m-5 position-relative">
			<AddUserButton />
			{users.map((u) => {
				return <UserPanel key={u.id} user={u}></UserPanel>;
			})}
		</div>
	);
};

const UsersLayout = () => {
	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getAllUsers();
			setUsersList(users);
		};
		fetchUsers();
	}, []);

	return <UsersGrid users={usersList}></UsersGrid>;
};

export default UsersLayout;
