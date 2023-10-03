type Props = { children: React.ReactNode, className?: string };

export default function TR({ children, className }: Props) {
  return <tr className={`${className}`}>{children}</tr>;
}
