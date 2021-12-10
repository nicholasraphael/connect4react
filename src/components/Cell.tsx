export const Cell = ({
  value,
  columnIndex,
  play,
}: {
  value: any;
  columnIndex: any;
  play: any;
}) => {
  let color = "white";

  if (value === 1) {
    color = "yellow-400";
  } else if (value === 2) {
    color = "green-700";
  }

  return (
    <td>
      <div className="flex flex-row rounded-lg">
        <button className="p-4 bg-yellow-800 rounded" onClick={() => {
        play(columnIndex)
    }}>
          <div className={`rounded-full bg-${color} p-10`}></div>
        </button>
      </div>
    </td>
  );
};
