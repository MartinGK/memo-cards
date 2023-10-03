type Props = { children: React.ReactNode, className?: string };

export default function THead({ children, className }: Props) {
  return (
    <thead className={`border-b font-medium dark:border-neutral-500 ${className}`}>
      {children}
    </thead>
  );
}
