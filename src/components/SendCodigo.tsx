import { useEffect, useState } from "react";
import RoundedInput from "./RoundedInput";
import Spinner from "./Spinner";

function SendCodigo() {
  const [codigo, setCodigo] = useState("");
  const [valido, setValido] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

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

  const handleSend = () => {
    // Aquí irá la lógica del envío
    console.log(codigo);

    setMostrarModal(true);
    setTimeout(() => {
      setMostrarModal(false);
    }, 2000);
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

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-white/50 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default SendCodigo;
