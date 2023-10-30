import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "../auth/login/route"; // Importa supabase desde la ruta de login

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("myTokenName");

  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { rut, rol_id } = jwt.verify(token.value, "secret");

  let { data: user, error } = await supabase
    .from('data_users')
    .select('id')
    .eq('rut', rut)
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  return NextResponse.json({
    id: user.id, // Devuelve la ID del usuario
    rut,
    rol_id,
  });
}
