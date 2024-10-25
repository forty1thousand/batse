import { useCounter } from "@uidotdev/usehooks";

interface StepProps {
  children(output: { forward(): void; backward(): void }): React.ReactNode[];
}

export function Steps({ children }: StepProps) {
  let counter = useCounter(0, { min: 0 });
  
  let output = {
    forward: counter[1].increment,
    backward: counter[1].decrement,
  };

  return children(output).at(counter[0]);
}
