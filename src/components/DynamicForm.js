// app/components/DynamicForm.js

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DynamicForm = ({ formItemData, attributes, submitFunction }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(()=>{
		if(formItemData){
			// Esto nos obliga a que cada campo del objeto coincida con su análogo en el id del html. Como el formulario lo construimos dinamicamente, deberia coincidir
			attributes.forEach(({name}) => {
				setValue(name, formItemData[name])
			});
		}
	});

	return (
		<form className="d-flex flex-col gap-3" onSubmit={handleSubmit(submitFunction)} >
			{/* Aunque no exista el atributo options no pasa nada. Se desestructura y se inicializa con undefined. Despues no se llega a ejecutar si no es un select  */}
			{attributes.map(({ name, label, type, validators, options }) => { 
				const validationRules = validators.reduce((rules, { key, value }) => {
					rules[key] = value;
					return rules;
				}, {});

				if (type === "select") {
					return (
						<div key={name}>
							<label className="form-label" htmlFor={name}>{label}:</label>
							<select  className="form-select" name={name} id={name} {...register(name, validationRules)}>
								{options.map(({value, text})=>{
									return(
										<option key={value} value={value}>{text}</option>
									);
								})}
							</select>
							{validators.map(
							({ key, errmssg }) =>
								errors[name]?.type === key && (
									<p key={key} className="text-red-500">
										{errmssg}
									</p>
								)
						)}
						</div>
					);
				}

				return (
					<div key={name}>
						<label htmlFor={name}>{label}:</label>
						<input className="text-black form-control" type={type} id={name} {...register(name, validationRules)} />
						{validators.map(
							({ key, errmssg }) =>
								errors[name]?.type === key && (
									<p key={key} className="text-red-500">
										{errmssg}
									</p>
								)
						)}
					</div>
				);
			})}
			<input type="submit" value="Guardar" className="btn btn-primary"/>
		</form>
	);
};

export default DynamicForm;

// Ejemplo de varibales de estructura
// const productFields = [
//     {
//       name: "name",
//       label: "Nombre",
//       type: "text",
//       validators: [
//         { key: "required", value: true, errmssg: "El nombre es obligatorio" },
//         { key: "maxLength", value: 256, errmssg: "Máximo 256 caracteres" },
//       ],
//     },
//     {
//       name: "price",
//       label: "Precio",
//       type: "number",
//       validators: [
//         { key: "required", value: true, errmssg: "El precio es obligatorio" },
//         { key: "min", value: 1, errmssg: "El precio debe ser mayor a 0" },
//       ],
//     },
//   ];

// Ejemplo de estructura original de formulario
// {/* <form onSubmit={handleSubmit(submitForm)}>
// 				<div>
// 					<label htmlFor="name">Nombre:</label>
// 					<input className="text-black" type="text" id="name" {...register("name", { required: true, maxLength: 128 })}/>
// 					{/* LESSON: errors.description será un objeto, y su propiedad type indicará el tipo de error */}
// 					{errors.name?.type === "required" && <p>Este campo es obligatorio</p>}
// 					{errors.name?.type === "maxLength" && <p>El nombre no puede exceder los 128 caracteres</p>}
// 				</div>
// 				<div>
// 					<label htmlFor="price">Precio:</label>
// 					<input className="text-black" type="number" id="price" {...register("price", { required: true, maxLength: 512 })}/>
// 					{errors.price?.type === "required" && <p>Este campo es obligatorio</p>}
// 					{errors.price?.type === "maxLength" && <p>La descripción no puede exceder los 512 caracteres</p>}
// 				</div>
// 				<div>
// 					<label htmlFor="amount">Stock:</label>
// 					<input className="text-black" type="number" id="amount" {...register("amount", { required: true, min: 0 })}/>
// 					{errors.amount?.type === "required" && <p>Este campo es obligatorio</p>}
// 				</div>
// 				<div>
// 					<label htmlFor="description">Descripción:</label>
// 					<input className="text-black" type="text" id="description" {...register("description", { required: true, maxLength: 1024 })}/>
// 					{errors.description?.type === "required" && <p>Este campo es obligatorio</p>}
// 					{errors.description?.type === "maxLength" && <p>La descripción no puede exceder los 1024 caracteres</p>}
// 				</div>
// 				<div>
// 					<label htmlFor="imgFile"></label>
// 					<input
// 						type="file"
// 						id="imgFile"
// 						// LESSON: En input[type="file"] el valor del input es un objeto FileList. validate permite crear validaciones personalizadas
// 						{...register("imgFile", {
// 							required: true,
// 							validate: (value) => {
// 								// LESSON: .type en este caso devuelve el MIME del archivo. Para imagenes: image/jpeg, image/png, etc
// 								if (!value[0].type.startsWith("image/")) return "Sólo se permiten imágenes.";
// 								if (value[0].size > 1024 * 1024 * 6) return "La imagen no puede pesar más de 6 MBs";
// 								return true;
// 							},
// 						})}
// 					/>
// 					{errors.imgFile?.type === "required" && <p>Este campo es obligatorio</p>}
// 					{errors.imgFile?.type === "validate" && <p>{errors.imgFile.message}</p>}
// 				</div>
//                 <input type="submit"/>
// 			</form> */}
