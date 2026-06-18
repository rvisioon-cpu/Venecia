"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import gsap from 'gsap';
import { preloadImages } from '@/utils/preload';

interface SceneControllerProps {
  isHighlighted?: boolean;
}

interface BgLayer {
  id: number;
  src: string;
}

const CROSSFADE_MS = 350;

export default function SceneController({ isHighlighted }: SceneControllerProps) {
  const { viewState, endTransition, currentRoom, currentFace, confirmRotation, finishRotation, transitionUrl, timeOfDay, targetDestination, floorsData, buildingFacesData } = useStore();
  const router = useRouter();

  // Preload the first floor plan while the "enter building" walk video plays.
  useEffect(() => {
    if (viewState === 'TRANSITION_VIDEO' && targetDestination === 'Floors') {
      const targetFloor = floorsData.find(f => f.id === '9');
      if (targetFloor) preloadImages([targetFloor.floorPlanImage]).catch(() => { });
    }
  }, [viewState, targetDestination, floorsData]);

  const currentFaceData = buildingFacesData[currentFace] || buildingFacesData[0];
  const currentAssetSet = currentFaceData ? currentFaceData[timeOfDay] : null;
  const targetBackground = currentAssetSet?.background;

  // Double-buffered background: each new background image is appended as its
  // own <img> layer, stacked on top (later DOM order = painted on top) and
  // starts at opacity-0. It crossfades in once it has actually loaded/decoded,
  // and only then do we drop the older layer(s) underneath — so the previous
  // face is never abruptly swapped/blanked while the new one is still
  // loading/decoding.
  const layerIdRef = useRef(0);
  const [bgLayers, setBgLayers] = useState<BgLayer[]>(() =>
    targetBackground ? [{ id: layerIdRef.current, src: targetBackground }] : []
  );
  const [readyLayerIds, setReadyLayerIds] = useState<Set<number>>(() => new Set([layerIdRef.current]));

  useEffect(() => {
    if (!targetBackground) return;
    setBgLayers((prev) => {
      if (prev.length > 0 && prev[prev.length - 1].src === targetBackground) return prev;
      layerIdRef.current += 1;
      return [...prev, { id: layerIdRef.current, src: targetBackground }];
    });
  }, [targetBackground]);

  const handleBackgroundLoaded = (id: number) => {
    setReadyLayerIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // Prune any layers older than this one once the crossfade has finished.
    setTimeout(() => {
      setBgLayers((prev) => {
        const idx = prev.findIndex((l) => l.id === id);
        if (idx <= 0) return prev;
        return prev.slice(idx);
      });
    }, CROSSFADE_MS);
  };

  const isTransitioning =
    viewState === 'TRANSITION_VIDEO' ||
    viewState === 'TRANSITION_ROTATION' ||
    viewState === 'TRANSITION_TIMELAPSE';

  const activeVideoUrl =
    transitionUrl || (viewState === 'TRANSITION_VIDEO' ? (currentAssetSet?.introVideo ?? null) : null);

  const handleVideoEnd = () => {
    if (viewState === 'TRANSITION_VIDEO') {
      if (targetDestination === 'Floors') {
        // Keep the video mounted (masking the unload) while navigating to /plantas.
        router.push('/plantas');
      } else {
        endTransition('Lobby');
      }
    } else if (viewState === 'TRANSITION_ROTATION') {
      // Commit target face and unmount immediately
      useStore.setState((s) => ({
        currentFace: s.nextFace !== null ? s.nextFace : s.currentFace,
        nextFace: null,
        viewState: 'IDLE',
        transitionUrl: null
      }));
    } else if (viewState === 'TRANSITION_TIMELAPSE') {
      // Commit target time of day and unmount immediately
      useStore.setState((s) => ({
        timeOfDay: s.timeOfDay === 'day' ? 'night' : 'day',
        viewState: 'IDLE',
        transitionUrl: null
      }));
    }
  };

  return (
    <div className="w-full h-full relative bg-black overflow-hidden">

      {/* LAYER 1: 360 Panorama (Static background) */}
      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
        {currentRoom === 'Lobby' ? (
          <div className="relative w-full h-full">
            {bgLayers.map((layer) => (
              <img
                key={layer.id}
                src={layer.src}
                alt={currentFaceData?.name || "Edificio"}
                decoding="async"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const markReady = () => handleBackgroundLoaded(layer.id);
                  if (img.decode) {
                    img.decode().then(markReady).catch(markReady);
                  } else {
                    markReady();
                  }
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${readyLayerIds.has(layer.id) ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              />
            ))}

            {/* Background Video Layer - Fades in when ready */}
            {currentAssetSet?.backgroundVideo && (
              <video
                key={`${currentFace}-${timeOfDay}-${currentAssetSet.backgroundVideo}`}
                src={currentAssetSet.backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                onCanPlay={(e) => {
                  gsap.to(e.currentTarget, { opacity: 1, duration: 1, ease: "power2.inOut" });
                }}
                onError={() => console.warn("Background video failed to load")}
              />
            )}

            {isHighlighted && currentAssetSet?.highlight && (
              <img
                src={currentAssetSet.highlight}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10"
                alt="Highlight"
              />
            )}
            {currentFaceData?.name && (
              <div className="absolute top-10 left-10 p-4 bg-black/50 text-white z-20">
                <h1 className="text-2xl font-light tracking-widest">{currentFaceData.name}</h1>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-4xl text-white font-light tracking-widest">
            360 VIEW: {currentRoom}
          </h1>
        )}
      </div>

      {/* LAYER 2: Transition Video — mounted fresh per transition, unmounted on end */}
      {isTransitioning && activeVideoUrl && (
        <video
          key={`${viewState}-${activeVideoUrl}`}
          src={activeVideoUrl}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={(e) => { e.currentTarget.play().catch(() => { }); }}
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover z-50 pointer-events-none"
        />
      )}

    </div>
  );
}
