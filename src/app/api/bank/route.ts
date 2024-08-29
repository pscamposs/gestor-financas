import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import executeQuery from "@/services/mysql";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const query =
      "select id, label, invoice_closing_day, color, icon from user_banks where bank_user_id = ?";
    const [rows]: any = await executeQuery(query, [userId]);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const data = await request.json();

    const bankSchema = z.object({
      label: z.string().min(1, "O campo 'label' é obrigatório."),
      invoice_closing_day: z
        .number()
        .int()
        .min(1)
        .max(
          31,
          "O dia de fechamento da fatura deve ser um número entre 1 e 31."
        ),
      color: z
        .string()
        .min(1)
        .regex(/^#[0-9A-Fa-f]{6}$/),
      icon: z.string().min(1, "O campo 'icon' é obrigatório."),
    });

    const query = `
      INSERT INTO user_banks (label, invoice_closing_day, color, icon, bank_user_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const parsedData = bankSchema.parse(data);
    const { label, invoice_closing_day, color, icon } = parsedData;

    await executeQuery(query, [
      label,
      invoice_closing_day,
      color,
      icon,
      userId,
    ]);

    return NextResponse.json(
      {
        message: "Banco adicionado com sucesso.",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    let errorMessage = "Ops, ocorreu um erro.";
    let details = error.message;

    if (error instanceof z.ZodError) {
      errorMessage =
        "Erro de validação: " + error.errors.map((e) => e.message).join(", ");
      details = error.issues.map((e) => e.message).join(", ");
    }

    return NextResponse.json(
      {
        error: true,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const data = await request.json();
    const { id, label, invoice_closing_day, color, icon } = data;

    if (!id) {
      return NextResponse.json(
        {
          error: true,
          message: "ID do banco é necessário.",
        },
        {
          status: 400,
        }
      );
    }

    const query = `
      UPDATE user_banks
      SET label = ?, invoice_closing_day = ?, color = ?, icon = ? WHERE id = ? AND bank_user_id = ?
    `;

    const result = await executeQuery(query, [
      label,
      invoice_closing_day,
      color,
      icon,
      id,
      userId,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Banco não encontrado ou você não tem permissão para atualizá-lo.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        error: false,
        message: "Banco atualizado com sucesso.",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: true,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
