import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ServiceCanvasProps {
    seed?: string;
    glow?: boolean;
    className?: string;
}

export function ServiceCanvas({ glow = true, className = '' }: ServiceCanvasProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className={`relative flex h-full w-full items-center justify-center p-6 select-none ${className}`}>
            {/* Ambient Backing Glow */}
            {glow && (
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.15)_0%,transparent_70%)] blur-2xl" />
            )}

            {/* Futuristic Tech Blueprint Mesh */}
            <svg
                viewBox="0 0 240 240"
                className={`relative h-full w-full max-w-[220px] ${
                    !prefersReducedMotion ? 'animate-[spin_40s_linear_infinite]' : ''
                }`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer Ring */}
                <circle cx="120" cy="120" r="100" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
                <circle cx="120" cy="120" r="80" stroke="#00D1FF" strokeWidth="1" opacity="0.2" />

                {/* Cross Grid */}
                <line x1="120" y1="10" x2="120" y2="230" stroke="#00D1FF" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
                <line x1="10" y1="120" x2="230" y2="120" stroke="#2EC4A5" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />

                {/* Isometric Cube Wireframe */}
                <polygon points="120,60 165,85 165,135 120,160 75,135 75,85" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.04)" />
                <line x1="120" y1="110" x2="120" y2="160" stroke="#2EC4A5" strokeWidth="1.5" />
                <line x1="120" y1="110" x2="165" y2="85" stroke="#2EC4A5" strokeWidth="1.5" />
                <line x1="120" y1="110" x2="75" y2="85" stroke="#2EC4A5" strokeWidth="1.5" />

                {/* Floating Orbiting Satellite Nodes */}
                <circle cx="120" cy="20" r="4" fill="#00D1FF" />
                <circle cx="220" cy="120" r="4" fill="#2EC4A5" />
                <circle cx="120" cy="220" r="4" fill="#00D1FF" />
                <circle cx="20" cy="120" r="4" fill="#2EC4A5" />
            </svg>
        </div>
    );
}

export default ServiceCanvas;
