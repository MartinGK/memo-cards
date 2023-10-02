import CardAddNewRelation from "../components/CardAddNewRelation";
import myCard from "@/app/store/Card";

export default function Add() {
  return (
    <div
      className="flex flex-col items-center h-full w-full"
      role="container"
      aria-label="add-container"
    >
      <CardAddNewRelation card={myCard} />
    </div>
  );
}
