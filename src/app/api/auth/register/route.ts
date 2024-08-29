import executeQuery from "@/services/mysql";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, salary, email, password } = await request.json();

    if (!name || !salary || !email || !password) {
      return NextResponse.json(
        {
          error: "Preencha todos os campos.",
        },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO user (name, salary, email, password)
      VALUES (?, ?, ?, ?)
    `;

    try {
      const result = await executeQuery(query, [
        name,
        salary,
        email,
        hashedPassword,
      ]);
    } catch (error: any) {
      if (error.code == "ER_DUP_ENTRY") {
        return NextResponse.json(
          {
            error: true,
            message: "Usuário já cadastrado.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Cadastrado com sucesso.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
