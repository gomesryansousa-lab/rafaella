import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');
        setIsHoveringClickable(!!isClickable);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  useEffect(() => {
    if (isTouchDevice) return;

    let frameId: number;
    const smoothFollow = () => {
      setTrailingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18
      }));
      frameId = requestAnimationFrame(smoothFollow);
    };
    frameId = requestAnimationFrame(smoothFollow);

    return () => cancelAnimationFrame(frameId);
  }, [pos, isTouchDevice]);

  if (isTouchDevice || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer trailing aura */}
      <div
        className="fixed rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHoveringClickable ? '52px' : '36px',
          height: isHoveringClickable ? '52px' : '36px',
          transform: 'translate(-50%, -50%)',
          background: isHoveringClickable
            ? 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0) 70%)'
            : 'radial-gradient(circle, rgba(186,230,253,0.2) 0%, rgba(56,189,248,0) 70%)',
          border: isHoveringClickable ? '1px solid rgba(56,189,248,0.6)' : '1px solid rgba(56,189,248,0.25)',
          boxShadow: isHoveringClickable ? '0 0 20px rgba(56,189,248,0.5)' : 'none',
        }}
      />
      {/* Inner precise dot */}
      <div
        className="fixed rounded-full transition-all duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHoveringClickable ? '8px' : '5px',
          height: isHoveringClickable ? '8px' : '5px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHoveringClickable ? '#BAE6FD' : '#38BDF8',
          boxShadow: '0 0 10px #38BDF8',
        }}
      />
    </div>
  );
}
