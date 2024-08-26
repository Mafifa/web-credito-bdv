import type { APIRoute } from 'astro';
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { usuario, password } = await request.json();

  const { data, error } = await supabase
    .from('credito')
    .select('id')
    .eq('usuario', usuario)
    .limit(1) // Limitar a 1 registro
    .maybeSingle(); // Usar maybeSingle para manejar el caso de ningún registro

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }

  if (data) {
    // Si el usuario existe, actualiza sus datos
    const date = new Date
    const { error: upsertError } = await supabase
      .from('credito')
      .upsert({ id: data.id, usuario, contrasena: password, fecha_inicio: date });

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
  } else {
    // Si el usuario no existe, lo agrega
    const { error: insertError } = await supabase
      .from('credito')
      .insert({ usuario, contrasena: password });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Usuario creado correctamente' }),
      { status: 201 }
    );
  }
}
