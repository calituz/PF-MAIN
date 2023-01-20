import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCreateUser } from "../../redux/actions/POST/index";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import Logo from "../../Assets/Images/Logo.png";
const INITIAL_STATE = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  wallet: 0,
  isActive: true,
  isAdmin: false,
};
const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^[\s\S]{8,25}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const CreateUserForm = () => {
  const [register, setRegister] = useState(INITIAL_STATE);
  const [validateRegister, setValidateRegister] = useState({
    name: true,
    email: true,
    password: true,
    equalsPassword: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setRegister({
      ...register,
      [name]: value,
    });
    setValidateRegister({
      ...validateRegister,
      [name]: expresiones[name].test(value.trim()),
    });
  };
  const handleSubmitRegister = async (evt) => {
    evt.preventDefault();
    if (
      !validateRegister.name ||
      !validateRegister.email ||
      !validateRegister.password ||
      !validateRegister.equalsPassword
    ) {
      setTimeout(() => {
        setValidateRegister({
          ...validateRegister,
        });
      }, 2500);
      return setValidateRegister({
        ...validateRegister,
      });
    }
    dispatch(postCreateUser(register));
    // // window.localStorage.setItem(PASSWORD, register.password);
    setRegister(INITIAL_STATE);
    return navigate("/home");
  };

  return (
    <div className="container-register">
      <div className="container-logo-adilbet">
        <img src={Logo} alt="Logo-adilbet" className="Logo-login" />
      </div>
      <div className="container-register-form">
        <div className="container-form-body">
          <h3 className="title-form">Registrate.</h3>
          <form onSubmit={handleSubmitRegister} className="form-body">
            <div
              className={
                "container-input-name" + validateRegister.name
                  ? null
                  : " nameError"
              }
            >
              <p className="text-form">Nombre</p>
              <input
                placeholder="Nombre"
                value={register.name}
                name="name"
                onChange={handleChange}
                type="text"
                className="form-input"
              />
              {validateRegister.name ? null : (
                <div>
                  <span className="span-form">
                    El nombre no puede contener numeros y menos de 5 letras
                  </span>
                </div>
              )}
            </div>
            <div className="container-input-name">
              <p className="text-form">Nombre de Usuario</p>
              <input
                placeholder="Nombre de Usuario"
                value={register.userName}
                name="userName"
                onChange={handleChange}
                type="text"
                className="form-input"
              />
            </div>

            <div className="container-input-name">
              <p className="text-form">Correo Electronico</p>
              <input
                placeholder="Correo Electronico"
                value={register.email}
                name="email"
                onChange={handleChange}
                type="email"
                className="form-input"
              />
              {validateRegister.email ? null : (
                <span className="span-form">
                  El correo electronico no es valido
                </span>
              )}
            </div>

            <div className="container-input-name">
              <p className="text-form">Contraseña</p>
              <input
                placeholder="Contraseña"
                value={register.password}
                name="password"
                onChange={handleChange}
                type="password"
                className="form-input"
              />
            </div>

            <div className="container-input-name">
              <p className="text-form">Confirmar Contraseña</p>
              <input
                placeholder="Confirmar Contraseña"
                value={register.confirm_password}
                name="confirm_password"
                onChange={handleChange}
                type="password"
                className="form-input"
              />
            </div>

            {validateRegister.password ? null : (
              <span className="span-form">
                La contraseña tiene que contener minimo 8 caracteres
              </span>
            )}
            {register.password !== register.confirm_password &&
            register.password.length >= 8 ? (
              <span className="span-form">Las contraseñas no coinciden</span>
            ) : null}

            <div className="container-input-name">
              <p className="text-form">Numero de telefono</p>
              <input
                placeholder="Telefono"
                value={register.phone}
                name="phone"
                onChange={handleChange}
                type="text"
                className="form-input"
              />
            </div>

            <div className="button-check-register">
              <button className="button-register">Confirma registro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
