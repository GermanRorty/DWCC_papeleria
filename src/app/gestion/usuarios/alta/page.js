// app/usuarios/gestion

"use client";

import DynamicForm from "@/components/DynamicForm";
import { addNewUser } from "@/lib/services/users";
import { useContext } from "react";

const userFields = [
	{
		name: "name",
		label: "Nombre",
		type: "text",
		validators: [
			{ key: "required", value: true, errmssg: "El nombre es obligatorio" },
			{ key: "maxLength", value: 256, errmssg: "Máximo 256 caracteres" },
		],
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		validators: [
			{ key: "required", value: true, errmssg: "El email es obligatorio" },
			{ key: "min", value: 1, errmssg: "El precio debe ser mayor a 0" },
		],
	},
	{
		name: "psswrd",
		label: "Contraseña",
		type: "password",
		validators: [
			{ key: "required", value: true, errmssg: "El stock es obligatorio" },
			{ key: "min", value: 0, errmssg: "El stock no puede ser negativo" },
		],
	},
	{
		name: "rol",
		label: "Rol",
		type: "select",
        options:[
            {value:"admin", text:"Administrador"},
            {value:"common-user", text:"Usuario"},
            {value:"employee", text:"Empleado"}
        ],
		validators: [
			{ key: "required", value: true, errmssg: "La descripción es obligatoria" },
			{ key: "maxLength", value: 1024, errmssg: "Máximo 1024 caracteres" },
		],
	},

];

const UserManagementForm = () => {
	const submitForm = async (data) => {
		try {
			data.cart = [];
			const userAdded = await addNewUser(data); // Este data es un objeto normal con la informacion del formulario
			console.log("Usuario guardado:", userAdded);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className="d-flex flex-col justify-content-center align-items-center pt-10">
			<h5 className="w-50">Datos del usuario</h5>
            <div className="w-50 pt-3">
			    <DynamicForm attributes={userFields} submitFunction={submitForm}/>
            </div>
		</div>
	);
};

const UserManagement = () => {
	return <UserManagementForm />;
};

export default UserManagement;
