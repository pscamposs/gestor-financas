import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await pool.getConnection();

  try {
    const { id } = params;

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
      DELETE FROM user_banks
      WHERE id = ?
    `;

    const result = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          error:
            "Banco não encontrado ou você não tem permissão para excluí-lo.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Banco excluído com sucesso.",
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
