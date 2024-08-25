import type { APIRoute } from 'astro';
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { usuario, password } = await request.json();

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

  if (data) {
    // Si el usuario existe, actualiza sus datos
    const { error: upsertError } = await supabase
      .from('usuarios')
      .upsert({ id: data.id, usuario, password });

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
      .from('usuarios')
      .insert({ usuario, password });

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


