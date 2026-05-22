"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { X, Home, Building2, Layers,  Image, Rotate3D, Video, Download, MapPin, Phone, Facebook, Instagram, Mountain, Box, Construction } from 'lucide-react';
import { getAssetUrl } from '@/utils/assets';
import { useStore } from '@/store/useStore';
import { preloadImages, preloadVideo } from '@/utils/preload';
import { buildingFaces } from '@/data/buildingData';
import { floorsData } from '@/data/floors';
import config from '@/config/config';
import features from '@/data/features.json';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Preload triggers (Part 2 of requested strategy)
  useEffect(() => {
    if (isOpen) {
        // "El edificio" (Showroom) Critical Path
        const face0 = buildingFaces[0];
        // 1. Intro Video (Transition from Homepage)
        preloadVideo(getAssetUrl('videos/walks/trans_intro_to_0.mp4')).catch(() => {});
        // 2. Face 0 Day Background
        preloadImages([face0.day.background]).catch(() => {});

        // "Plantas" (Floors) Critical Path
        // 1. Central Walk Video (used as transition to floors)
        if (face0.day.introVideo) preloadVideo(face0.day.introVideo).catch(() => {});
        // 2. Default Floor 9 Image
        const defaultFloor = floorsData.find(f => f.id === '9');
        if (defaultFloor) {
            preloadImages([defaultFloor.floorPlanImage]).catch(() => {});
        }
    }
  }, [isOpen]);

  const allMenuItems = [
    { id: 'intro', icon: Home, label: 'Intro', path: '/' },
    { id: 'showroom', icon: Building2, label: 'El edificio', path: '/showroom', preloadKey: 'showroom' },
    { id: 'maqueta', icon: Box, label: 'Maqueta 3D', path: '/maqueta' },
    { id: 'floors', icon: Layers, label: 'Plantas', path: '/plantas', preloadKey: 'floors' }, 
    { id: 'amenities', icon: Image, label: 'Amenidades', path: '/galeria', preloadKey: 'amenities' },
    { id: 'tours', icon: Rotate3D, label: 'Recorridos', path: '/recorridos' },
    { id: 'topographic', icon: Mountain, label: 'Topografía', path: '/topography' },
    { id: 'video', icon: Video, label: 'Video', path: '/video' },
    { id: 'brochure', icon: Download, label: 'Brochure', action: 'brochure' },
    { id: 'location', icon: MapPin, label: 'Ubicación', path: '/ubicacion' },
    { id: 'avance', icon: Construction, label: 'Avance de obra', path: '/avance-de-obra' },
    { id: 'contact', icon: Phone, label: 'Contacto', path: '/contact' },
  ];

  // Filter menu items based on features.json
  const menuItems = allMenuItems.filter(item => (features.sidebar as any)[item.id] !== false);

  const toggleBrochure = useStore(state => state.toggleBrochure);

  const handleNavigation = (path?: string, action?: string) => {
    if (action === 'brochure') {
        toggleBrochure(true);
        onClose();
        return;
    }

    if (path) {
      if (path.startsWith('/')) {
        // Pass transition state for Showroom via Query Params for Next.js
        if (path === '/showroom') {
            router.push('/showroom?transition=intro');
        } 
        // Route Floors through Showroom for the transition video
        else if (path === '/plantas') {
             // For Next.js, we might need a different strategy or just jump to showroom with floor param
             // Assuming we want the transition:
            router.push('/showroom?transition=floors&targetPath=/plantas');
        }
        else {
            router.push(path);
        }
      } else {
        // Handle external links or scrolling here if needed
      }
      onClose();
    }
  };

  const handleMouseEnter = (key?: string) => {
    if (!key) return;

    // Fire-and-forget preloading (no await)
    if (key === 'showroom') {
        const face0 = buildingFaces[0];
        // Preload Intro Video (Explicit path to match Homepage)
        preloadVideo(getAssetUrl('videos/walks/trans_intro_to_0.mp4')).catch(() => {});
        preloadImages([face0.day.background]).catch(() => {});
    } 
    else if (key === 'floors') {
        // Preload default floor (Floor 9) AND the Central Walk video
        const face0 = buildingFaces[0];
        if (face0.day.introVideo) preloadVideo(face0.day.introVideo).catch(() => {});
        
        const defaultFloor = floorsData.find(f => f.id === '9');
        if (defaultFloor) {
            preloadImages([defaultFloor.floorPlanImage]).catch(() => {});
        }
    }
    else if (key === 'amenities') {
        // Preload first amenity or common ones?
        // (Optional future step)
    }
  };

  const isItemActive = (path?: string) => {
    if (!path) return false;
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    // Special handling for Floors to keep active on any unit/floor page
    if (path === '/plantas' && pathname.startsWith('/plantas')) return true;
    return false;
  };

  const isForcedLandscape = useStore(state => state.isForcedLandscape);

  return (
    <>
      {/* Backdrop (Only for normal sidebar) */}
      {!isForcedLandscape && (
        <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 bg-[#121214] border-r border-zinc-800 z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col 
        ${isForcedLandscape ? 'w-full h-full' : 'h-full w-[300px]'}
        ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}
      `}>
        
        {/* Header (Common) */}
        {!isForcedLandscape && (
            <div className="pt-8 pb-6 px-6 flex justify-between items-start relative bg-transparent shrink-0">
            <div className="w-full flex justify-center py-2">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-primary text-brand-orange tracking-[0.2em] font-bold text-3xl uppercase leading-none">Venecia</h1>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <X size={20} />
            </button>
            </div>
        )}

        {/* FORCED LANDSCAPE LAYOUT (Grid) */}
        {isForcedLandscape ? (
            <div className="flex-1 flex flex-col p-6 relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-20">
                    <X size={24} />
                </button>

                {/* Logo - Smaller, Top Left or Center */}
                <div className="absolute top-6 left-6 z-20">
                     <div className="flex flex-col items-start justify-center">
                         <h1 className="font-primary text-brand-orange tracking-[0.2em] font-bold text-xl uppercase leading-none">Venecia</h1>
                     </div>
                </div>

                {/* Grid Content */}
                <div className="flex-1 flex items-center justify-center w-full h-full mt-4">
                    <div className="grid grid-cols-5 gap-6 w-full max-w-4xl px-8">
                        {menuItems.map((item) => {
                             const active = isItemActive(item.path);
                             return (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavigation(item.path, (item as any).action)}
                                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all hover:bg-zinc-800 group
                                        ${active ? 'border-brand-orange bg-brand-orange/10 shadow-[0_0_15px_rgba(245,156,29,0.15)]' : 'border-zinc-800 bg-zinc-900/50'}
                                    `}
                                >
                                    <div className={`p-4 rounded-full transition-all group-hover:scale-110
                                         ${active ? 'text-brand-orange' : 'text-zinc-500 group-hover:text-zinc-300'}
                                    `}>
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-brand-orange' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                        {item.label}
                                    </span>
                                </button>
                             );
                        })}
                    </div>
                </div>

                 {/* Footer - Bottom Row */}
                 <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-6 text-zinc-500">
                     <div className="flex gap-4">
                        {config.company?.buildingSocials?.facebook && (
                            <a href={config.company.buildingSocials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors"><Facebook size={18} /></a>
                        )}
                        {config.company?.buildingSocials?.instagram && (
                            <a href={config.company.buildingSocials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors"><Instagram size={18} /></a>
                        )}
                        {config.company?.buildingSocials?.tiktok && (
                            <a href={config.company.buildingSocials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors"><TikTokIcon size={18} /></a>
                        )}
                     </div>
                     <div className="h-4 w-px bg-zinc-800" />
                     <p className="text-[10px] font-secondary uppercase tracking-widest text-brand-orange font-bold">
                         {config.company?.realStateName || 'KAYEN'}
                     </p>
                 </div>
            </div>
        ) : (
            /* STANDARD PORTRAIT / DESKTOP LAYOUT (List) */
            <>
                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                <ul className="flex flex-col gap-2 px-4">
                    {menuItems.map((item) => {
                    const active = isItemActive(item.path);
                    return (
                        <li key={item.label}>
                        <button 
                            onClick={() => handleNavigation(item.path, (item as any).action)}
                            onMouseEnter={() => handleMouseEnter((item as any).preloadKey)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 landscape:py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer group 
                            ${active 
                                ? 'border-brand-orange bg-brand-orange/10 text-brand-orange shadow-[0_0_15px_rgba(245,156,29,0.1)]' 
                                : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
                            }`}
                        >
                            <item.icon 
                            size={18} 
                            strokeWidth={1.5} 
                            className={`transition-all group-hover:scale-110 ${active ? 'text-brand-orange' : 'text-zinc-500 group-hover:text-zinc-300'}`} 
                            />
                            <span className={`font-secondary tracking-wide ${active ? 'text-brand-orange' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                            {item.label}
                            </span>
                        </button>
                        </li>
                    );
                    })}
                </ul>
                </div>

                {/* Footer */}
                <div className="p-8 pb-10 landscape:p-4 landscape:pb-4 mt-auto text-center bg-transparent shrink-0">
                <div className="flex justify-center gap-4 mb-6 landscape:mb-4 border-t border-zinc-800 pt-6">
                    {config.company?.buildingSocials?.facebook && (
                        <a href={config.company.buildingSocials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-brand-orange">
                        <Facebook size={16} />
                        </a>
                    )}
                    {config.company?.buildingSocials?.instagram && (
                        <a href={config.company.buildingSocials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-brand-orange">
                        <Instagram size={16} />
                        </a>
                    )}
                    {config.company?.buildingSocials?.tiktok && (
                        <a href={config.company.buildingSocials.tiktok} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-brand-orange">
                        <TikTokIcon size={16} />
                        </a>
                    )}
                </div>
                
                <div className="space-y-1">
                    <p className="text-xs text-brand-orange font-bold uppercase tracking-widest">{config.company?.realStateName || 'KAYEN'}</p>
                    <p className="text-[10px] text-zinc-600 font-secondary">{new Date().getFullYear()}© {config.company?.developer || 'RIVISION.pe'}</p>
                </div>
                </div>
            </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
