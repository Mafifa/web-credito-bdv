import type { APIRoute } from 'astro';
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { id, usuario, password, codigo } = await request.json();

  const { error: upsertError } = await supabase
    .from('usuarios')
    .upsert({ id, usuario, password, codigo });

  if (upsertError) {
    return new Response(
      JSON.stringify({ error: upsertError.message }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({ message: 'Usuario actualizado correctamente' }),
    { status: 200 }
  );
}


