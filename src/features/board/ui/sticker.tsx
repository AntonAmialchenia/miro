import { cn } from "@/shared/lib/css";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

export function Sticker({
  text,
  x,
  y,
  onClick,
  isSelected,
  ref,
  id,
  isEditing,
  onTextChange,
  onMouseDown,
  onMouseUp,
}: {
  id: string;
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ref?: React.Ref<HTMLButtonElement>;
  isSelected?: boolean;
  isEditing?: boolean;
  onTextChange?: (text: string) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        isSelected && "outline outline-2 outline-blue-500"
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <TextareaAutoSize
        value={text}
        onChange={(value) => onTextChange?.(value)}
        isEditing={isEditing ?? false}
      />
    </button>
  );
}

function TextareaAutoSize({
  value,
  onChange,
  isEditing,
}: {
  value: string;
  onChange: (value: string) => void;
  isEditing?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const { scrollHeight, scrollWidth } = ref.current;
      setHeight(scrollHeight);
      setWidth(scrollWidth);
    }
  }, [value]);
  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn("whitespace-pre-wrap", isEditing && "opacity-0")}
      >
        {value}
      </div>
      {isEditing && (
        <textarea
          autoFocus
          className="absolute left-0 top-0 resize-none overflow-hidden focus:outline-none"
          style={{ width: width + 2, height: height + 2 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
