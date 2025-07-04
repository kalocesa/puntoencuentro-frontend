import app from "../config/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

export const registrarUsuario = async (email, contraseña) => {
  return await createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesion = async (email, contraseña) => {
  return await signInWithEmailAndPassword(auth, email, contraseña);
};

export const cerrarSesion = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada exitosamente 🫡");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export default auth;
