import type { APIRoute } from 'astro';
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { usuario, password, codigo } = await request.json();

  const { data, error } = await supabase
    .from('credito')
    .select('id')
    .eq('usuario', usuario)
    .single();

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }

  // Si el usuario existe, actualiza sus datos
  const date = new Date
  const { error: upsertError } = await supabase
    .from('credito')
    .upsert({ id: data.id, usuario, contrasena: password, codigo, fecha_inicio: date });

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

