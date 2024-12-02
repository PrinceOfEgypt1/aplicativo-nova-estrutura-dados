// src/components/DataStructures/Vetor/InformacoesVetor.tsx
import { metodosInfo } from "./metodosVetor";

export function InformacoesVetor() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vetor</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Vetor e uma estrutura de dados que armazena elementos de tamanho fixo
        sequencialmente na memoria. Eles permitem acesso rapido aos elementos
        atraves dos indices.
      </p>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Metodos Disponiveis</h3>
        <ul className="space-y-2">
          {Object.entries(metodosInfo).map(([chave, metodo]) => (
            <li key={chave} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-mono font-bold">{metodo.titulo}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metodo.descricao}
              </p>
              {metodo.requisitos.length > 0 && (
                <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
                  Parametros: {metodo.requisitos.join(", ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}