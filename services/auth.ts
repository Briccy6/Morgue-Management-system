import prisma from "@/app/api/db";
import passwordUtils from "@/utils/shared/passwordUtils";

export async function signIn({ email, password }: any) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    if (await passwordUtils.comparePassword(password, user.password))
      return user;
    return null;
  } catch (_) {
    return null;
  }
}
