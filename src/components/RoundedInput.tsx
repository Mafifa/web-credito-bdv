import React, { useState, useRef, useEffect } from 'react';

interface RoundedInputProps {
  length?: number;
  onValuesChange: (value: string) => void;
}

function RoundedInput ({ length = 6, onValuesChange }: RoundedInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const concatenatedValues = values.join('');
    if (onValuesChange) {
      onValuesChange(concatenatedValues);
    }
  }, [values, onValuesChange]);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) { // Validar que sea un dígito
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Mover el foco al siguiente input si está disponible
      if (index < length - 1) {
        const nextInput = inputsRef.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newValues = [...values];
      if (newValues[index] === '') {
        // Si el cuadrito está vacío, mover el foco al anterior y borrar su valor
        if (index > 0) {
          const prevInput = inputsRef.current[index - 1];
          if (prevInput) {
            prevInput.focus();
          }
          newValues[index - 1] = '';
        }
      } else {
        // Borrar el valor del cuadrito actual
        newValues[index] = '';
      }
      setValues(newValues);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          value={value}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          maxLength={1}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '18px',
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/\D/, ''); // Elimina cualquier carácter no numérico
          }}
        />
      ))}
    </div>
  );
};

export default RoundedInput;
