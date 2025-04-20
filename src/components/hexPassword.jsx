import React, { useState } from 'react';

function calculatePassword(b1, b3) {
  return 187 * b1 + 59 * b3 - 10500;
}

function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

export default function PasswordCalculator() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState(null);

  const handleCalculate = () => {
    const bytes = code.trim().split('-');

    if (bytes.length < 4) {
      alert('Código inválido. São necessários pelo menos 4 bytes.');
      return;
    }

    const b1 = hexToDecimal(bytes[1]);
    const b3 = hexToDecimal(bytes[3]);

    const result = calculatePassword(b1, b3);
    setPassword(result);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Gerador de Senha</h2>
      <input
        type="text"
        placeholder="Insira o código hexadecimal"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
      >
        Calcular Senha
      </button>
      {password !== null && (
        <div className="text-center text-lg font-semibold text-green-700">
          Senha: {password.toString().padStart(5, '0')}
        </div>
      )}
    </div>
  );
}