import prisma from "../../db";
import { signToken } from "../../auth";
import { hashPassword } from "../../../helper/password";

//* SIGN-IN -> para obtener el token
export const signIn = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(500).json({
        ok: false,
        data: "User not found",
      });
    }

    if (user.password !== hashPassword(req.body.password)) {
      return res.status(500).json({
        ok: false,
        data: "Error in email or password",
      });
    }

    //?Se obtiene el token
    user.token = signToken(user);
    delete user.password;

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};

//* SIGN-UP -> Creacion de usuario, encriptacion del password
export const signUp = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashPassword(req.body.password),
      },
    });

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};
