type Props = { children: React.ReactNode; className?: string };

export default function TD({ children, className }: Props) {
  return (
  <td className={`whitespace-nowrap px-6 py-4 ${className}`}>
      {children}
    </td>
  );
}