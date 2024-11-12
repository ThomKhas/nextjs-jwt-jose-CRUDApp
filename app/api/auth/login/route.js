import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_URL_KEY;
const supabaseKey = process.env.NEXT_PUBLIC_URL_SUPABASE;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const { rut, password } = await request.json();

    const { data: user, error } = await supabase
      .from('data_users')
      .select('rut, password, rol_id')
      .eq('rut', rut)
      .single();

    if (error) {
      console.error('Error fetching user data:', error.message);
      return NextResponse.json(
        { message: 'An error occurred while fetching user data' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('User not found:', rut);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User data:', user);

    if (user.password === password) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          rut: user.rut,
          rol_id: user.rol_id,
        },
        process.env.NEXT_PUBLIC_SECRET_TOKEN_SHET
      );

      const res = NextResponse.json({
        token,
        rol_id: user.rol_id,
      });

      res.cookies.set({
        name: "jwtYuri",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });

      return res;
    } else {
      console.log('Invalid credentials:', rut);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
