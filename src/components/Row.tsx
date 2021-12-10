import React from "react";
import { Cell } from "./Cell";

export default function Row({ row, play }: { row: any; play: any }) {
  return (
    <tr className="shadow-lg">
      {row.map((cell: any, i: number) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  );
}
