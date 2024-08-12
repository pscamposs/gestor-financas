import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
  const db = await pool.getConnection();

  try {
    const query = "call get_user_invoices(1)";
    const [rows]: any = await db.execute(query);
    const invoiceData = rows[0];

    return NextResponse.json(invoiceData);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  } finally {
    db.release();
  }
}

export async function POST(request: NextRequest) {
  const db = await pool.getConnection();

  try {
    const data = await request.json();
    const userId = 1;

    const { method, flow, name, date, installments, description, value, bank } =
      data;

    const query = `
      INSERT INTO user_invoices (user_id, date, installments, method, flow, name, description, value, bank_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
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
  } finally {
    db.release();
  }
}

export async function PUT(request: NextRequest) {
  const db = await pool.getConnection();

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
      bank,
    } = data;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID da fatura é necessário.",
        },
        {
          status: 400,
        }
      );
    }

    const query = `
      UPDATE user_invoices
      SET method = ?, flow = ?, name = ?, date = ?, installments = ?, description = ?, value = ?, bank_id = ?
      WHERE id = ?
    `;

    const result = await db.query(query, [
      method,
      flow,
      name,
      date,
      installments,
      description,
      value,
      bank,
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          error:
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
    console.error(error);

    return NextResponse.json(
      {
        error: "Ops, ocorreu um erro.",
        details: error.message,
      },
      { status: 500 }
    );
  } finally {
    db.release();
  }
}
