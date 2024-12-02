// src/components/ui/progress.tsx
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

// Interface para as propriedades do componente Progress
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  // Valor atual da barra de progresso (0-100)
  value?: number;
  // Indicador visual de que a operação está completa
  isComplete?: boolean;
  // Mensagem de status para acessibilidade
  ariaLabel?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, isComplete = false, ariaLabel, ...props }, ref) => {
  // Garante que o valor está entre 0 e 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={`
        relative w-full overflow-hidden rounded-full bg-gray-700 h-2.5
        ${className || ''}
      `}
      {...props}
      // Propriedades ARIA para acessibilidade
      aria-label={ariaLabel || 'Progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
    >
      <ProgressPrimitive.Indicator
        className={`
          h-full w-full flex-1 transition-all duration-300 ease-in-out
          ${isComplete ? 'bg-green-500' : 'bg-purple-600'}
        `}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = 'Progress';

export { Progress };