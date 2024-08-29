import executeQuery from "@/services/mysql";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: true,
          message: "Preencha todos os campos.",
        },
        { status: 400 }
      );
    }

    const query = `SELECT * FROM user WHERE email = ?`;

    const result = await executeQuery(query, [email]);

    const [user] = result[0];

    if (!user) {
      return NextResponse.json(
        {
          error: true,
          message: "Email ou senha incorretos.",
        },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: true,
          message: "Email ou senha incorretos.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: false,
        message: "Logado com sucesso.",
        profile: {
          id: user?.id,
          name: user.name,
          email: user.email,
          salary: Number(user.salary),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Erro ao tentar fazer login.",
      },
      {
        status: 500,
      }
    );
  }
}
