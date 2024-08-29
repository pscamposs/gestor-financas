import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import executeQuery from "@/services/mysql";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const queryProfile = `
      SELECT id, name, salary from user WHERE id = ?;
    `;
    const [profileRows]: any = await executeQuery(queryProfile, [userId]);
    const profileData = profileRows[0];

    return NextResponse.json({
      error: false,
      message: "Sucesso",
      profile: profileData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
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

    const { name, salary } = data;

    const querySave = `
      UPDATE user SET name =?, salary = ? WHERE id =?;
    `;
    const [profileRows]: any = await executeQuery(querySave, [
      name,
      salary,
      userId,
    ]);

    return NextResponse.json({
      error: false,
      message: "Alterações salvas",
      profile: {
        name,
        salary,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: error,
      },
      { status: 500 }
    );
  }
}
