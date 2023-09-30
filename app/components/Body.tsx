type Props = {
  children: React.ReactNode;
};

export default function Body({ children }: Props) {
  return <body className="flex flex-col items-center bg-[linear-gradient(to bottom, #FFB42D 0%, #FFCB6D 50%, #FFF 100%)] w-screen h-screen m-0">{children}</body>;
}
