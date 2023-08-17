import Learn from "./Learn/page";

export default function Home({children}: {children: React.ReactNode}) {
  console.log({children})
  return <Learn />;
}
