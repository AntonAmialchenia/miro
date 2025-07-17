import clsx from "clsx";

export function Sticker({
  text,
  x,
  y,
  onClick,
  selected,
  ref,
  id,
  isEditing,
  onTextChange,
}: {
  id: string;
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  isSelected?: boolean;
  isEditing?: boolean;
  onTextChange?: (text: string) => void;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        selected && "outline outline-2 outline-blue-500"
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {isEditing ? (
        <input
          type="text"
          className="w-full h-full"
          autoFocus
          value={text}
          onChange={(e) => onTextChange?.(e.target.value)}
        />
      ) : (
        text
      )}
    </button>
  );
}
