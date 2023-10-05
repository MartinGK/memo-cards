import { Suspense } from "react";
import Table, { TH, THead } from "../components/Table";
import TR from "../components/Table/TR";
import CardTableRows from "./CardsTableRows";

export default function CardsTable() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <Table className="min-w-full text-left text-sm font-light">
              <THead className="border-b font-medium dark:border-neutral-500">
                <TR>
                  <TH>#</TH>
                  <TH>Date of creation</TH>
                  <TH>Word/s</TH>
                  <TH>Relation</TH>
                  <TH>Learned</TH>
                  <TH></TH>
                </TR>
              </THead>
              <Suspense fallback={<tbody><tr></tr></tbody>}>
                <CardTableRows />
              </Suspense>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
