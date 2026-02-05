"use client";
import { useSearchStore } from "@/app/store/useSearchStore";
import { ProductivityMethod } from "@/app/definitions/definitions";
import { useMemo, useRef, useState, useEffect, memo, useCallback } from "react";

const TagButton = memo(
  ({
    tag,
    isSelected,
    onClick,
  }: {
    tag: string;
    isSelected: boolean;
    onClick: (tag: string) => void;
  }) => (
    <button
      onClick={() => onClick(tag)}
      className={`whitespace-nowrap shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize border ${
        isSelected
          ? "bg-blue-200 text-blue-600 border-transparent"
          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-500"
      }`}
      aria-pressed={isSelected}
      aria-label={`Filter by ${tag}`}
    >
      {tag}
    </button>
  ),
);

TagButton.displayName = "TagButton";

export default function TagFilter({
  methods,
}: {
  methods: ProductivityMethod[];
}) {
  const selectedTags = useSearchStore((state) => state.selectedTags);
  const toggleTag = useSearchStore((state) => state.toggleTag);

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const [isDraggingState, setIsDraggingState] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maskImage, setMaskImage] = useState("none");

  const uniqueTags = useMemo(() => {
    const allTags = methods.flatMap((m) => m.tags);
    return Array.from(new Set(allTags)).sort();
  }, [methods]);

  const handleTagClick = useCallback(
    (tag: string) => {
      if (!isDraggingRef.current) {
        toggleTag(tag);
      }
    },
    [toggleTag],
  );

  const checkScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    const isStart = scrollLeft <= 0;
    const isEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;

    let newMask =
      "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)";

    if (isStart && isEnd) newMask = "none";
    else if (isStart)
      newMask = "linear-gradient(to right, black 85%, transparent 100%)";
    else if (isEnd)
      newMask = "linear-gradient(to right, transparent 0%, black 15%)";

    setMaskImage((prev) => (prev === newMask ? prev : newMask));
  }, []);

  useEffect(() => {
    const ref = sliderRef.current;
    if (!ref) return;

    let animationFrameId: number;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(checkScroll);
    };

    const initialCheckId = requestAnimationFrame(checkScroll);

    ref.addEventListener("scroll", onScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      ref.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkScroll);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(initialCheckId);
    };
  }, [checkScroll, uniqueTags]);

  const startDragging = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    setIsDraggingState(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={onMouseMove}
      className={`flex gap-2 overflow-x-auto items-center no-scrollbar transition-all duration-300 ${
        isDraggingState ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        maskImage: maskImage,
        WebkitMaskImage: maskImage,
        willChange: "scroll-position",
      }}
    >
      {uniqueTags.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          isSelected={selectedTags.includes(tag)}
          onClick={handleTagClick}
        />
      ))}
    </div>
  );
}
