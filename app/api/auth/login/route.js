import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://knxqdasxbmkqkqpxzlba.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_ENCRIPTADO_MD5_HEX;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  const { rut, password } = await request.json();

  let { data: user, error } = await supabase
    .from('data_users')
    .select('rut, password, rol_id')
    .eq('rut', rut)
    .single()

  if (error) {
    console.log(error.message);
    return;
  }

  if (user && user.password === password) {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        rut: user.rut,
        rol_id: user.rol_id,
      },
      "secret"
    );

    const res = NextResponse.json({ // cambia 'response' a 'res'
      token,
      rol_id: user.rol_id, // agrega rol_id a la respuesta
    });

    res.cookies.set({
      name: "myTokenName",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });


    return res;
  } else {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  }
}
