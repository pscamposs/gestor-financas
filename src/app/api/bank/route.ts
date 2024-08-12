import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
  const db = await pool.getConnection();

  try {
    const query =
      "select id, label, invoice_closing_day, color, icon from user_banks";
    const [rows]: any = await db.execute(query);
    return NextResponse.json(rows);
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

    const { label, invoice_closing_day, color, icon } = data;

    const query = `
      INSERT INTO user_banks (label, invoice_closing_day, color, icon)
      VALUES (?, ?, ?, ?)
    `;

    await db.query(query, [label, invoice_closing_day, color, String(icon)]);

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
    const { id, label, invoice_closing_day, color, icon } = data;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID do banco é necessário.",
        },
        {
          status: 400,
        }
      );
    }

    const query = `
      UPDATE user_banks
      SET label = ?, invoice_closing_day = ?, color = ?, icon = ? WHERE id = ?
    `;

    const result = await db.query(query, [
      label,
      invoice_closing_day,
      color,
      String(icon),
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          error:
            "Banco não encontrado ou você não tem permissão para atualizá-lo.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
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
        error: "Ops, ocorreu um erro.",
        details: error.message,
      },
      { status: 500 }
    );
  } finally {
    db.release();
  }
}
