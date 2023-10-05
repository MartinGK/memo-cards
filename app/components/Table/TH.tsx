type Props = { children?: React.ReactNode; className?: string };

export default function TH({ children, className }: Props) {
  return (
    <th scope="col" className={`px-6 py-4 ${className}`}>
      {children}
    </th>
  );
}
