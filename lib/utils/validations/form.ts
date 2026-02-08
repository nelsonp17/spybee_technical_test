export class regexClass {
  static email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  static username = /^[a-zA-Z0-9_]+$/;
}

export const loginValidations = {
  email: {
    required: "El correo es obligatorio",
    pattern: {
      value: regexClass.email,
      message: "Formato de correo inválido",
    },
  },
  password: {
    required: "La contraseña es obligatoria",
  },
};

export const registerValidations = {
  ...loginValidations,
  username: {
    required: "El nombre de usuario es obligatorio",
    minLength: {
      value: 3,
      message: "El usuario debe tener al menos 3 caracteres",
    },
    pattern: {
      value: regexClass.username,
      message: "Solo letras, números y guiones bajos",
    },
  },
  password: {
    required: "La contraseña es obligatoria",
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres",
    },
  },
};
