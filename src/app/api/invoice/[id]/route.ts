import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/services/mysql";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          error: true,
          message: "ID da fatura é necessário.",
        },
        {
          status: 400,
        }
      );
    }

    const query = `
      DELETE FROM user_invoices
      WHERE id = ?
      AND user_id = ?`;

    const result = await executeQuery(query, [id, userId]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Fatura não encontrada ou você não tem permissão para excluí-la.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        error: false,
        message: "Fatura excluída com sucesso.",
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
