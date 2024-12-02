// src/components/ui/slider.tsx
import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

// Interface para as propriedades do componente Slider
interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Label para acessibilidade
  ariaLabel?: string;
  // Função chamada quando o valor muda
  onValueChange?: (value: number[]) => void;
  // Valor mínimo permitido
  min?: number;
  // Valor máximo permitido
  max?: number;
  // Incremento/decremento para cada passo
  step?: number;
  // Valor atual do slider
  value?: number[];
  // Texto de ajuda abaixo do slider
  helpText?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ 
  className,
  ariaLabel,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  value,
  helpText,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      <SliderPrimitive.Root
        ref={ref}
        className={`
          relative flex w-full touch-none select-none items-center
          ${className || ''}
        `}
        // Propriedades para controle do slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        aria-label={ariaLabel}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-700">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-purple-600" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={`
            block h-5 w-5 rounded-full border-2 border-purple-600
            bg-white ring-offset-background transition-colors
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-purple-400 focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50
            hover:bg-purple-50
          `}
        />
      </SliderPrimitive.Root>
      {helpText && (
        <p className="text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };