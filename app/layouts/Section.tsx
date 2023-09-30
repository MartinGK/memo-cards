export default function Section({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col pt-[10rem] items-center h-full w-full">{children}</section>;
}
