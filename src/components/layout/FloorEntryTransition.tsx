"use client";
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

// Plays the "walk into the building" video as a fixed, full-screen overlay
// that lives at the layout level (outside any page's component tree). This
// way it keeps playing uninterrupted across the showroom -> /plantas/9
// client-side navigation instead of being tied to (and unmounted with) the
// page that triggered it, which is what caused a flash/flicker between the
// video ending and the floor plan appearing.
export default function FloorEntryTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const viewState = useStore(state => state.viewState);
  const transitionUrl = useStore(state => state.transitionUrl);
  const targetDestination = useStore(state => state.targetDestination);
  const hasNavigatedRef = useRef(false);

  const isActive = viewState === 'TRANSITION_VIDEO' && targetDestination === 'Floors' && !!transitionUrl;

  useEffect(() => {
    if (isActive) {
      if (!hasNavigatedRef.current && !pathname.startsWith('/plantas')) {
        hasNavigatedRef.current = true;
        router.push('/plantas/9');
      }
    } else {
      hasNavigatedRef.current = false;
    }
  }, [isActive, pathname, router]);

  if (!isActive) return null;

  const handleEnd = () => {
    useStore.setState({
      viewState: 'IDLE',
      transitionUrl: null,
      targetDestination: null,
      currentRoom: 'Lobby',
    });
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black">
      <video
        key={transitionUrl}
        src={transitionUrl!}
        autoPlay
        muted
        playsInline
        onLoadedMetadata={(e) => { e.currentTarget.play().catch(() => { }); }}
        onEnded={handleEnd}
        onError={handleEnd}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
