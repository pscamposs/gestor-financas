import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import executeQuery from "@/services/mysql";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const query = `call get_user_invoices(${userId})`;
    const [rows]: any = await executeQuery(query);
    const invoiceData = rows[0];

    return NextResponse.json(invoiceData);
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

    const { method, flow, name, date, installments, description, value, bank } =
      data;

    const query = `
      INSERT INTO user_invoices (user_id, date, installments, method, flow, name, description, value, bank_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      userId,
      date,
      installments,
      method,
      flow,
      name,
      description,
      value,
      bank,
    ]);

    return NextResponse.json(
      {
        message: "Valor adicionado com sucesso.",
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
        error: "Ops, ocorreu um erro.",
        details: error.message,
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
    const {
      id,
      method,
      flow,
      name,
      date,
      installments,
      description,
      value,
      bank_id,
    } = data;

    if (!id) {
      return NextResponse.json(
        {
          error: true,
          message: "Fatura inválida.",
        },
        {
          status: 400,
        }
      );
    }

    const query = `
      UPDATE user_invoices
      SET method = ?, flow = ?, name = ?, date = ?, installments = ?, description = ?, value = ?, bank_id = ?
      WHERE id = ? AND user_id = ?
    `;

    const result = await executeQuery(query, [
      method,
      flow,
      name,
      date,
      installments,
      description,
      value,
      bank_id,
      id,
      userId,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Fatura não encontrada ou você não tem permissão para atualizá-la.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Fatura atualizada com sucesso.",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
