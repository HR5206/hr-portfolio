import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type Point = { x: number; y: number };
type DragSession = {
  pointerId: number;
  pointer: Point;
  position: Point;
};

function isFloating(element: HTMLElement) {
  return window.getComputedStyle(element).position === "absolute";
}

function getLimits(element: HTMLElement): Point {
  const area = element.parentElement;
  return {
    x: Math.max(0, (area?.clientWidth ?? 0) - element.offsetWidth - 10),
    y: Math.max(0, (area?.clientHeight ?? 0) - element.offsetHeight - 10),
  };
}

function clamp(point: Point, limits: Point): Point {
  return {
    x: Math.max(0, Math.min(point.x, limits.x)),
    y: Math.max(0, Math.min(point.y, limits.y)),
  };
}

export function useHRWindowDrag() {
  const windowRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragSession | null>(null);
  // Let CSS place a fresh window. Record pixel coordinates only after it moves.
  const [position, setPosition] = useState<Point | null>(null);

  useEffect(() => {
    const element = windowRef.current;
    const area = element?.parentElement;
    if (!element || !area) return;

    function fitWindow() {
      if (!element || element.hidden || !isFloating(element)) {
        dragRef.current = null;
        return;
      }
      const limits = getLimits(element);
      setPosition((current) => {
        if (!current) return null;
        const next = clamp(current, limits);
        return current.x === next.x && current.y === next.y ? current : next;
      });
    }

    const observer = new ResizeObserver(fitWindow);
    observer.observe(element);
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    const element = windowRef.current;
    if (!element || !isFloating(element) || !event.isPrimary || event.button !== 0) {
      return;
    }
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      pointer: { x: event.clientX, y: event.clientY },
      position: { x: element.offsetLeft, y: element.offsetTop },
    };
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    const element = windowRef.current;
    if (
      !drag || !element || element.hidden || !isFloating(element) ||
      drag.pointerId !== event.pointerId
    ) return;

    setPosition(clamp({
      x: drag.position.x + event.clientX - drag.pointer.x,
      y: drag.position.y + event.clientY - drag.pointer.y,
    }, getLimits(element)));
  }

  function stopDrag(event: PointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function moveWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    const element = windowRef.current;
    if (!element || !isFloating(element)) return;
    const step = event.shiftKey ? 32 : 8;
    const directions: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const limits = getLimits(element);
    setPosition((current) => clamp({
      x: (current?.x ?? element.offsetLeft) + direction.x,
      y: (current?.y ?? element.offsetTop) + direction.y,
    }, limits));
  }

  return { windowRef, position, startDrag, moveDrag, stopDrag, moveWithKeyboard };
}

