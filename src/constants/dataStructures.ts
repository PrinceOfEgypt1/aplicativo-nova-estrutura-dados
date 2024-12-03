// src/constants/dataStructures.ts

import * as React from 'react';
import { ListTodo } from 'lucide-react';

export const dataStructures = [
    {
        type: 'vetor',
        name: 'Vetor',
        description: 'Estrutura de dados linear que armazena elementos em sequência.',
        icon: React.createElement(ListTodo, { size: 20 }), // Usando React.createElement
    },
    // ... (outras estruturas de dados, se você as tiver adicionado de volta)
];