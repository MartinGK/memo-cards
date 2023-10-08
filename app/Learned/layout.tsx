export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-20 pb-40 grid grid-cols-[repeat(auto-fill,minmax(20rem,_1fr))] gap-24 w-full items-center">
      {children}
    </div>
  );
}
