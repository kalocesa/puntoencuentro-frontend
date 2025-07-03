import app from "../config/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

export const registrarUsuario = async (email, contraseña) => {
  return await createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesion = async (email, contraseña) => {
  return await signInWithEmailAndPassword(auth, email, contraseña);
};

export default auth;
