import React, { useState } from "react";
import SuccessChecked from "./SuccessChecked";

function CreditoSolicitud() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleClick = () => {
    setMostrarModal(true);
  };

  const handleFinalizar = () => {
    window.location.href = "https://www.bancodevenezuela.com/";
  };

  return (
    <div className="space-y-4">
      {/* Campos Monto y Tiempo */}
      <div className="grid grid-cols-2 gap-4">
        {/* Campo Monto */}
        <div className="grid grid-cols-1 items-center bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid hover:border-[#bb1b47]">
          <label className="text-sm text-black/50" htmlFor="monto">
            Monto *
          </label>
          <select className="bg-transparent w-full" name="monto" id="monto">
            <option value="1000">36.860 Bs</option>
            <option value="5000">184.300 Bs</option>
            <option value="10000">368.600 Bs</option>
            <option value="20000">737.200 Bs</option>
            <option value="50000">1.843.000 Bs</option>
          </select>
        </div>

        {/* Campo Tiempo */}
        <div className="grid grid-cols-1 items-center bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid hover:border-[#bb1b47]">
          <label className="text-sm text-black/50" htmlFor="tiempo">
            Tiempo *
          </label>
          <select className="bg-transparent w-full" name="tiempo" id="tiempo">
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="18">18 meses</option>
            <option value="24">24 meses</option>
          </select>
        </div>
      </div>

      {/* Campo Razón */}
      <div className="grid grid-cols-1 items-center bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid hover:border-[#bb1b47]">
        <label className="text-sm text-black/50" htmlFor="razon">
          Razón *
        </label>
        <select className="bg-transparent w-full" name="razon" id="razon">
          <option value="educacion">Educación</option>
          <option value="emprendimiento">Emprendimiento</option>
          <option value="vivienda">Vivienda</option>
          <option value="salud">Salud</option>
        </select>
      </div>

      {/* Campo Dirección */}
      <div className="grid grid-cols-1 items-center bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid hover:border-[#bb1b47]">
        <label className="text-sm text-black/50" htmlFor="direccion">
          Dirección *
        </label>
        <input
          className="bg-transparent w-full"
          type="text"
          name="direccion"
          id="direccion"
          placeholder="Nr58, Calle 1 Sur, Miranda"
        />
      </div>

      {/* Botón */}
      <div className="pt-3 text-center">
        <button
          onClick={handleClick}
          className="w-3/4 bg-[#bb1b47] text-white py-2 rounded-sm shadow-md shadow-black/10 hover:bg-[#a0133a]"
        >
          Enviar Solicitud
        </button>
      </div>

      {mostrarModal && (
        <div className="p-4 fixed inset-0 bg-white/50 flex flex-col justify-center items-center">
          <div className="scale-50 -mt-28">
            <SuccessChecked />
          </div>
          <div className=" max-w-96 -mt-16 bg-white p-6 rounded-sm shadow-black/30 shadow-xl grid grid-cols-1 lg:px-24 sm:px-16 items-center">
            <p className="text-base text-center font-extrabold mb-4 text-[#0067b1]">
              ¡Completado!
            </p>

            <p className="text-center text-pretty">
              Nos pondremos en contacto con usted en las próximas semanas.
            </p>

            <div className="grid grid-cols-1 items-center text-center gap-y-4 mt-3">
              <button
                onClick={handleFinalizar}
                className="text-sm bg-[#0067b1] text-white/90 py-2 px-4 rounded w-1/2 md:w-3/4 mx-auto self-center"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditoSolicitud;
