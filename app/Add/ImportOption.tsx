import Link from "next/link";
import PaperButton from "../components/PaperButton";

type Props = {}

export default function ImportOption({ }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span><i>You can import a .json or a .xlsx file too</i></span>
      <Link href="/Import" className="self-center">
        <PaperButton>Go to import page</PaperButton>
      </Link>
    </div>
  );
}