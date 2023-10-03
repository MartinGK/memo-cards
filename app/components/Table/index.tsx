import TD from "./TD";
import TH from "./TH";
import TR from "./TR";
import THead from "./THead";
import TBody from "./THead";

type Props = { children: React.ReactNode; className?: string };

export default function Table({ children, className }: Props) {
  return (
    <table className={`min-w-full text-left text-sm font-light ${className}`}>
      {children}
    </table>
  );
}

export { Table, TD, TH, TR, THead, TBody };
