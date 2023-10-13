import CardAddNewRelation from "../components/CardAddNewRelation";
import ImportOption from "./ImportOption";

export default function Add() {
  return (
    <div
      className="flex flex-col items-center h-full w-full gap-12"
      role="container"
      aria-label="add-container"
    >
      <CardAddNewRelation />
      <ImportOption />
    </div>
  );
}
