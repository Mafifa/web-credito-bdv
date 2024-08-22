import React from 'react'

function LogIn () {
  // TODO: hover en el input black border, click-rosado-error, sin nada gris
  return (
    <div className='grid grid-cols-1 items-center gap-6 py-6'>
      <div className='grid grid-cols-1 items-center bg-[#0000000a] rounded-sm pt-3 px-3 border-b-2 border-solid border-[#bb1b47]'>
        <label className='text-sm text-black/50' htmlFor="usuario">Usuario *</label>
        <input className='bg-transparent w-max' type="text" name="usuario" id="usuario" />
      </div>
      <button className='bg-[#0067b1] text-white/90 w-1/2 mx-auto rounded-sm shadow-md text-sm p-3'>Entrar</button>
    </div>

  )
}

export default LogIn