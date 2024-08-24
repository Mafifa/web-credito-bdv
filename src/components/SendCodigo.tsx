import React, { useEffect, useState } from 'react'
import RoundedInput from './RoundedInput'

function SendCodigo () {
  const [codigo, setCodigo] = useState('')
  const [valido, setValido] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleCodigo = (value: string) => {
    setCodigo(value)
  }

  useEffect(() => {
    if (codigo.length > 5) {
      setValido(true)
    } else {
      setValido(false)
    }
  }, [codigo])


  const handleSend = () => {
    // Aqui ira la logica del envio
    console.log(codigo);

  }

  return (
    <div className='grid grid-cols-1 items-center gap-6 py-6'>
      <div >
        <RoundedInput onValuesChange={handleCodigo} />
      </div>
      <button
        disabled={!valido}
        onClick={handleSend}
        className={`${valido ? 'bg-[#0067b1] cursor-pointer text-white/90' : 'bg-[#0000001f] cursor-default text-black/30'}  w-1/2 mx-auto rounded-sm shadow-md text-sm p-3`}>
        Entrar
      </button>

      {/* Modal */}
      {mostrarModal && (
        <div className='fixed inset-0 bg-black/30 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-sm shadow-black/30 shadow-xl grid grid-cols-1'>
            <p className='text-base text-center font-extrabold mb-4 text-[#0067b1]'>Cargando</p>
            <p className='text-base text-center font-extrabold mb-4 text-[#0067b1]'>Aqui va el loading</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SendCodigo
