import React, { useState } from 'react'

function LogIn () {
  const [usuario, setUsuario] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [valido, setValido] = useState(false)
  const [validoPassword, setValidoPassword] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')


  const handleUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setUsuario(newQuery)
    if (newQuery.length > 5) {
      setValido(true)
    } else {
      setValido(false)
    }
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setPassword(newQuery)
    if (newQuery.length > 5) {
      setValidoPassword(true)
    } else {
      setValidoPassword(false)
    }

    if (newQuery === '') {
      setError('Contraseña es requerida')
    } else {
      setError('')
    }
  }

  const handleClick = () => {
    if (valido) {
      setMostrarModal(true)
    }
  }

  const cerrarModal = () => {
    setMostrarModal(false)
  }

  const handleSend = () => {
    // Aqui ira la logica del envio
  }

  return (
    <div className='grid grid-cols-1 items-center gap-6 py-6'>
      <div className='grid grid-cols-1 items-center bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid hover:border-[#bb1b47]'>
        <label className='text-sm text-black/50' htmlFor="usuario">Usuario *</label>
        <input value={usuario} onChange={handleUsuario} className='bg-transparent w-fit' type="text" name="usuario" id="usuario" />
      </div>
      <button onClick={handleClick} className={`${valido ? 'bg-[#0067b1] cursor-pointer text-white/90' : 'bg-[#0000001f] cursor-default text-black/30'}  w-1/2 mx-auto rounded-sm shadow-md text-sm p-3`}>Entrar</button>

      {/* Modal */}
      {mostrarModal && (
        <div className='fixed inset-0 bg-black/30 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-sm shadow-black/30 shadow-xl grid grid-cols-1'>
            <p className='text-base text-center font-extrabold mb-4 text-[#0067b1]'>Introduce tu contraseña</p>
            <div className='mb-10 flex flex-col bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid hover:border-[#bb1b47]'>
              <label className='text-sm text-black/50 text-start' htmlFor="usuario">Contraseña *</label>
              <button style={{ boxSizing: 'border-box' }} className='ml-auto -my-2' onClick={() => setVisible(!visible)} >
                <img src='./images/eye.png' alt='mostrar - ocultar' />
              </button>
              <input value={password} onChange={handlePassword} className='bg-transparent w-max' type={visible ? 'text' : 'password'} name="usuario" id="usuario" />
            </div>
            {error && (<span className='text-[#bb1b47] text-end text-sm -mt-6'>Contraseña es <strong>requerida</strong></span>)}
            <div className='grid grid-cols-1 items-center gap-y-4 mt-5'>
              <button onClick={handleSend} className={`${validoPassword ? 'bg-[#0067b1] cursor-pointer text-white/90' : 'bg-[#0000001f] cursor-default text-black/30'}  w-1/2 mx-auto rounded shadow-md text-sm py-2 px-4`}>Entrar</button>
              <button onClick={cerrarModal} className='text-sm bg-[#0067b1] text-white/90 py-2 px-4 rounded w-1/2 mx-auto'>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LogIn
