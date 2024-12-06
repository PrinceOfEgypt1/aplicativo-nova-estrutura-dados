//src/teste.tsx
import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';

function useCounter() { // Hook simples para o teste
    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1);
    return { count, increment };
}

test('incrementa o contador', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
        result.current.increment();
    });
    expect(result.current.count).toBe(1);
});