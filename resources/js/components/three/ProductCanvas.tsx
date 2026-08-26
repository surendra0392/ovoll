import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type ProductVariant =
    | 'enterprise'
    | 'commerce'
    | 'ondemand'
    | 'care'
    | 'community'
    | 'design'
    | 'fintech'
    | 'media'
    | 'mobile'
    | 'saas'
    | 'ai';

interface ProductCanvasProps {
    variant?: ProductVariant;
    color?: string;
    colorful?: boolean;
    className?: string;
}

const VARIANT_CONFIGS: Record<ProductVariant, { primary: string; secondary: string; label: string }> = {
    enterprise: { primary: '#2EC4A5', secondary: '#00D1FF', label: 'ENTERPRISE ARCHITECTURE' },
    commerce: { primary: '#00D1FF', secondary: '#3B82F6', label: 'COMMERCE ENGINE' },
    ondemand: { primary: '#6366F1', secondary: '#8B5CF6', label: 'REAL-TIME DISPATCH' },
    care: { primary: '#EC4899', secondary: '#F43F5E', label: 'TELEMETRY & CARE' },
    community: { primary: '#10B981', secondary: '#2EC4A5', label: 'NETWORK CONSTELLATION' },
    design: { primary: '#F59E0B', secondary: '#EC4899', label: 'BEZIER VECTOR STUDIO' },
    fintech: { primary: '#10B981', secondary: '#00D1FF', label: 'FINANCIAL LEDGER' },
    media: { primary: '#EF4444', secondary: '#F97316', label: 'STREAMING FREQUENCY' },
    mobile: { primary: '#06B6D4', secondary: '#3B82F6', label: 'MOBILE RUNTIME' },
    saas: { primary: '#3B82F6', secondary: '#6366F1', label: 'MULTI-TENANT CLOUD' },
    ai: { primary: '#8B5CF6', secondary: '#00D1FF', label: 'NEURAL SYNAPSE CORE' },
};

/* 1. ENTERPRISE ARCHITECTURE ANIMATION */
function EnterpriseScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Server Rack Nodes */}
            <rect x="20" y="40" width="50" height="100" rx="6" stroke={primary} strokeWidth="1.5" fill={`${primary}10`} />
            <rect x="25" y="52" width="40" height="12" rx="2" stroke={primary} strokeWidth="1" fill={`${primary}20`} />
            <rect x="25" y="72" width="40" height="12" rx="2" stroke={primary} strokeWidth="1" fill={`${primary}20`} />
            <rect x="25" y="92" width="40" height="12" rx="2" stroke={primary} strokeWidth="1" fill={`${primary}20`} />
            <rect x="25" y="112" width="40" height="12" rx="2" stroke={primary} strokeWidth="1" fill={`${primary}20`} />

            {/* Microservices Central Gateway */}
            <rect x="100" y="65" width="40" height="50" rx="6" stroke={secondary} strokeWidth="1.5" fill={`${secondary}15`} />
            <circle cx="120" cy="90" r="10" stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="120" cy="90" r="4" fill={primary} />

            {/* Sharded Database Cluster */}
            <g transform="translate(170, 50)">
                <ellipse cx="25" cy="15" rx="25" ry="10" stroke={primary} strokeWidth="1.5" fill={`${primary}15`} />
                <path d="M 0 15 L 0 45 C 0 52, 50 52, 50 45 L 50 15" stroke={primary} strokeWidth="1.5" fill={`${primary}10`} />
                <path d="M 0 45 L 0 75 C 0 82, 50 82, 50 75 L 50 45" stroke={primary} strokeWidth="1.5" fill={`${primary}10`} />
                <ellipse cx="25" cy="45" rx="25" ry="8" stroke={primary} strokeWidth="1" opacity="0.6" />
                <ellipse cx="25" cy="75" rx="25" ry="8" stroke={primary} strokeWidth="1" opacity="0.6" />
            </g>

            {/* Laser Data Pipes & Animated Packet Streams */}
            <path d="M 70 90 L 100 90" stroke={primary} strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 140 90 L 170 90" stroke={secondary} strokeWidth="1.5" strokeDasharray="4 4" />

            {!reduce && (
                <>
                    <motion.circle
                        r="3"
                        fill={primary}
                        animate={{ cx: [70, 100], cy: [90, 90] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.circle
                        r="3"
                        fill={secondary}
                        animate={{ cx: [140, 170], cy: [90, 90] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                    />
                </>
            )}
        </svg>
    );
}

/* 2. COMMERCE ENGINE ANIMATION */
function CommerceScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* 3D Showcase Glass Pedestal */}
            <polygon points="120,40 180,70 120,100 60,70" stroke={primary} strokeWidth="1.5" fill={`${primary}15`} />
            <polygon points="60,70 120,100 120,140 60,110" stroke={primary} strokeWidth="1.5" fill={`${primary}25`} />
            <polygon points="180,70 120,100 120,140 180,110" stroke={secondary} strokeWidth="1.5" fill={`${secondary}20`} />

            {/* Floating Shopping Bag / Product Jewel */}
            <motion.g
                animate={reduce ? {} : { y: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                {/* 1-Click Glass Card */}
                <rect x="140" y="25" width="65" height="42" rx="4" stroke={secondary} strokeWidth="1.2" fill="#0A1826CC" />
                <line x1="140" y1="36" x2="205" y2="36" stroke={secondary} strokeWidth="1" opacity="0.6" />
                <rect x="148" y="44" width="22" height="6" rx="1" fill={primary} />
                <circle cx="192" cy="48" r="4" fill={secondary} opacity="0.8" />

                {/* Floating Product Jewel */}
                <polygon points="120,30 135,50 120,70 105,50" stroke={primary} strokeWidth="1.5" fill={`${primary}30`} />
                <circle cx="120" cy="50" r="4" fill="#FFF" />
            </motion.g>

            {/* Currency Sparkles */}
            <circle cx="50" cy="45" r="8" stroke={primary} strokeWidth="1" strokeDasharray="2 2" />
            <text x="47" y="49" fill={primary} fontSize="10" fontFamily="monospace" fontWeight="bold">$</text>

            <circle cx="195" cy="135" r="7" stroke={secondary} strokeWidth="1" strokeDasharray="2 2" />
            <text x="192" y="139" fill={secondary} fontSize="9" fontFamily="monospace" fontWeight="bold">€</text>
        </svg>
    );
}

/* 3. REAL-TIME DISPATCH / ON-DEMAND ANIMATION */
function OnDemandScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Circular Radar Sweep Screen */}
            <circle cx="120" cy="90" r="70" stroke={primary} strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
            <circle cx="120" cy="90" r="45" stroke={primary} strokeWidth="1" opacity="0.4" />
            <circle cx="120" cy="90" r="20" stroke={secondary} strokeWidth="1.2" opacity="0.6" />
            <circle cx="120" cy="90" r="4" fill={primary} />

            {/* Crosshair Coordinate Grid */}
            <line x1="50" y1="90" x2="190" y2="90" stroke={primary} strokeWidth="0.8" opacity="0.25" />
            <line x1="120" y1="20" x2="120" y2="160" stroke={primary} strokeWidth="0.8" opacity="0.25" />

            {/* Radar Beam Rotation */}
            {!reduce && (
                <motion.line
                    x1="120"
                    y1="90"
                    x2="185"
                    y2="90"
                    stroke={primary}
                    strokeWidth="2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '120px 90px' }}
                />
            )}

            {/* GPS Dispatch Waypoints */}
            <g transform="translate(155, 55)">
                <circle cx="0" cy="0" r="6" fill={secondary} />
                <circle cx="0" cy="0" r="12" stroke={secondary} strokeWidth="1" className={!reduce ? 'animate-ping' : ''} />
            </g>
            <g transform="translate(80, 130)">
                <circle cx="0" cy="0" r="5" fill={primary} />
                <circle cx="0" cy="0" r="10" stroke={primary} strokeWidth="1" opacity="0.6" />
            </g>

            {/* Route Path Connector */}
            <path d="M 80 130 Q 110 110, 120 90 T 155 55" stroke={secondary} strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
    );
}

/* 4. HEALTHTECH & CARE ANIMATION */
function CareScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Medical Shield Border */}
            <path
                d="M 120 25 C 150 25, 180 35, 180 65 C 180 110, 140 145, 120 155 C 100 145, 60 110, 60 65 C 60 35, 90 25, 120 25 Z"
                stroke={primary}
                strokeWidth="1.5"
                fill={`${primary}08`}
            />

            {/* Glowing Cross Pulse in Shield */}
            <rect x="114" y="45" width="12" height="30" rx="2" fill={primary} opacity="0.8" />
            <rect x="105" y="54" width="30" height="12" rx="2" fill={primary} opacity="0.8" />

            {/* Live ECG Telemetry Heartbeat Waveform */}
            <motion.path
                d="M 40 110 L 80 110 L 90 95 L 100 130 L 115 70 L 125 125 L 135 105 L 145 110 L 200 110"
                stroke={secondary}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0.2, pathOffset: 0 }}
                animate={reduce ? { pathLength: 1 } : { pathOffset: [0, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Biometric Pulse Rings */}
            <circle cx="120" cy="90" r="55" stroke={secondary} strokeWidth="1" strokeDasharray="2 6" opacity="0.35" />
        </svg>
    );
}

/* 5. COMMUNITY & SOCIAL NETWORK ANIMATION */
function CommunityScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Central Community Node */}
            <circle cx="120" cy="90" r="18" fill={`${primary}25`} stroke={primary} strokeWidth="1.8" />
            <circle cx="120" cy="90" r="8" fill={primary} />

            {/* Satellite Peer Nodes */}
            {[
                { x: 50, y: 55, r: 10, fill: secondary },
                { x: 190, y: 55, r: 12, fill: primary },
                { x: 60, y: 135, r: 11, fill: primary },
                { x: 180, y: 130, r: 9, fill: secondary },
                { x: 120, y: 30, r: 8, fill: secondary },
            ].map((node, i) => (
                <g key={i}>
                    {/* Energy Connection Line */}
                    <line x1="120" y1="90" x2={node.x} y2={node.y} stroke={node.fill} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                    
                    {/* Node circle */}
                    <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={`${node.fill}20`}
                        stroke={node.fill}
                        strokeWidth="1.5"
                        animate={reduce ? {} : { scale: [1, 1.15, 1] }}
                        transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <circle cx={node.x} cy={node.y} r={node.r * 0.4} fill={node.fill} />
                </g>
            ))}

            {/* Constellation Ring */}
            <circle cx="120" cy="90" r="65" stroke={secondary} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.25" />
        </svg>
    );
}

/* 6. DESIGN TOOLS & BEZIER VECTOR STUDIO ANIMATION */
function DesignStudioScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Bezier Vector Curve */}
            <path
                d="M 40 130 C 70 30, 170 30, 200 130"
                stroke={primary}
                strokeWidth="2.5"
                fill="none"
            />

            {/* Animated Tangent Handles & Control Points */}
            <line x1="40" y1="130" x2="80" y2="50" stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="200" y1="130" x2="160" y2="50" stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Anchor Points (Square) */}
            <rect x="34" y="124" width="12" height="12" fill="#0A1826" stroke={primary} strokeWidth="1.8" />
            <rect x="194" y="124" width="12" height="12" fill="#0A1826" stroke={primary} strokeWidth="1.8" />

            {/* Tangent Control Nodes (Round) */}
            <circle cx="80" cy="50" r="5" fill={secondary} />
            <circle cx="160" cy="50" r="5" fill={secondary} />

            {/* Interactive Pen Cursor Stylus */}
            <motion.g
                animate={reduce ? {} : { x: [0, 40, -40, 0], y: [0, -10, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <polygon points="120,40 128,65 120,60 112,65" fill={primary} stroke="#FFF" strokeWidth="1" />
                <circle cx="120" cy="60" r="2" fill="#FFF" />
            </motion.g>

            {/* Color Swatch Tokens */}
            <rect x="75" y="145" width="18" height="18" rx="4" fill={primary} />
            <rect x="100" y="145" width="18" height="18" rx="4" fill={secondary} />
            <rect x="125" y="145" width="18" height="18" rx="4" fill="#8B5CF6" />
            <rect x="150" y="145" width="18" height="18" rx="4" fill="#EC4899" />
        </svg>
    );
}

/* 7. FINTECH & BLOCKCHAIN LEDGER ANIMATION */
function FintechScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Chart Grid Lines */}
            <line x1="30" y1="40" x2="210" y2="40" stroke="#FFF" strokeWidth="0.5" opacity="0.1" />
            <line x1="30" y1="80" x2="210" y2="80" stroke="#FFF" strokeWidth="0.5" opacity="0.1" />
            <line x1="30" y1="120" x2="210" y2="120" stroke="#FFF" strokeWidth="0.5" opacity="0.1" />

            {/* Candlestick Bars */}
            {[
                { x: 50, open: 110, close: 85, high: 75, low: 120, green: true },
                { x: 80, open: 90, close: 105, high: 80, low: 115, green: false },
                { x: 110, open: 100, close: 70, high: 60, low: 110, green: true },
                { x: 140, open: 75, close: 50, high: 40, low: 85, green: true },
                { x: 170, open: 55, close: 65, high: 45, low: 75, green: false },
                { x: 200, open: 60, close: 30, high: 20, low: 70, green: true },
            ].map((bar, i) => {
                const barColor = bar.green ? primary : '#EF4444';
                return (
                    <g key={i}>
                        {/* High-Low Wick */}
                        <line x1={bar.x} y1={bar.high} x2={bar.x} y2={bar.low} stroke={barColor} strokeWidth="1.2" />
                        {/* Candlestick Body */}
                        <rect
                            x={bar.x - 7}
                            y={Math.min(bar.open, bar.close)}
                            width="14"
                            height={Math.max(Math.abs(bar.open - bar.close), 4)}
                            rx="1.5"
                            fill={barColor}
                            opacity="0.85"
                        />
                    </g>
                );
            })}

            {/* Exponential Trendline */}
            <path
                d="M 40 120 Q 110 100, 140 60 T 210 25"
                stroke={secondary}
                strokeWidth="2"
                strokeDasharray="4 2"
            />

            {/* 256-Bit Encryption Lock Node */}
            <circle cx="195" cy="140" r="14" fill="#0A1826" stroke={primary} strokeWidth="1.5" />
            <rect x="189" y="136" width="12" height="10" rx="2" fill={primary} />
            <path d="M 192 136 L 192 131 C 192 128, 198 128, 198 131 L 198 136" stroke={primary} strokeWidth="1.5" fill="none" />
        </svg>
    );
}

/* 8. MEDIA & AUDIO STREAMING ANIMATION */
function MediaStreamingScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    const bars = [35, 60, 25, 80, 50, 95, 70, 40, 85, 65, 30, 90, 45];

    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Equalizer Frequency Bars */}
            {bars.map((h, i) => {
                const x = 35 + i * 14;
                const barColor = i % 2 === 0 ? primary : secondary;
                return (
                    <motion.rect
                        key={i}
                        x={x}
                        y={90 - h / 2}
                        width="8"
                        height={h}
                        rx="3"
                        fill={barColor}
                        opacity="0.85"
                        animate={reduce ? {} : {
                            height: [h * 0.4, h, h * 0.6],
                            y: [90 - (h * 0.4) / 2, 90 - h / 2, 90 - (h * 0.6) / 2],
                        }}
                        transition={{
                            duration: 1.2 + (i % 4) * 0.3,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />
                );
            })}

            {/* Broadcast Sound Wave Arcs */}
            <path d="M 20 60 A 40 40 0 0 0 20 120" stroke={primary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 220 60 A 40 40 0 0 1 220 120" stroke={secondary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 12 45 A 60 60 0 0 0 12 135" stroke={primary} strokeWidth="1.2" opacity="0.2" />
            <path d="M 228 45 A 60 60 0 0 1 228 135" stroke={secondary} strokeWidth="1.2" opacity="0.2" />
        </svg>
    );
}

/* 9. MOBILE & NATIVE RUNTIME ANIMATION */
function MobileRuntimeScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Smartphone Frameless Body */}
            <rect x="75" y="15" width="90" height="150" rx="14" stroke={primary} strokeWidth="2" fill="#07121ECC" />

            {/* Dynamic Island Notch */}
            <rect x="105" y="23" width="30" height="8" rx="4" fill="#FFF" opacity="0.8" />

            {/* Mobile App Screen UI */}
            <rect x="85" y="40" width="70" height="35" rx="6" fill={`${secondary}20`} stroke={secondary} strokeWidth="1" />
            <circle cx="100" cy="55" r="7" fill={primary} />
            <rect x="114" y="50" width="32" height="4" rx="1" fill="#FFF" opacity="0.7" />
            <rect x="114" y="58" width="22" height="3" rx="1" fill="#FFF" opacity="0.4" />

            {/* Floating 3D Push Notification Pill */}
            <motion.g
                animate={reduce ? {} : { y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                <rect x="50" y="85" width="140" height="36" rx="8" stroke={primary} strokeWidth="1.5" fill="#0D2034EE" />
                <circle cx="68" cy="103" r="8" fill={primary} />
                <rect x="84" y="96" width="60" height="5" rx="1.5" fill="#FFF" opacity="0.9" />
                <rect x="84" y="105" width="40" height="4" rx="1" fill={secondary} />
                <circle cx="176" cy="103" r="4" fill={secondary} />
            </motion.g>

            {/* Home Indicator Bar */}
            <rect x="105" y="155" width="30" height="3" rx="1.5" fill="#FFF" opacity="0.5" />
        </svg>
    );
}

/* 10. MULTI-TENANT SAAS CLOUD ANIMATION */
function SaasCloudScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Central Cloud Hub Node */}
            <circle cx="120" cy="90" r="28" fill={`${primary}15`} stroke={primary} strokeWidth="1.8" />
            <circle cx="120" cy="90" r="14" fill={`${secondary}30`} stroke={secondary} strokeWidth="1.2" />
            <circle cx="120" cy="90" r="6" fill="#FFF" />

            {/* Multi-Tenant Workspace Boxes */}
            {[
                { x: 45, y: 45, title: 'Tenant A', col: primary },
                { x: 195, y: 45, title: 'Tenant B', col: secondary },
                { x: 45, y: 135, title: 'Tenant C', col: secondary },
                { x: 195, y: 135, title: 'Tenant D', col: primary },
            ].map((box, i) => (
                <g key={i}>
                    {/* Pipeline Route */}
                    <line x1="120" y1="90" x2={box.x} y2={box.y} stroke={box.col} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

                    {/* Tenant Isometric Card */}
                    <rect x={box.x - 22} y={box.y - 16} width="44" height="32" rx="6" stroke={box.col} strokeWidth="1.4" fill="#0A1826DD" />
                    <rect x={box.x - 14} y={box.y - 8} width="28" height="4" rx="1" fill={box.col} />
                    <rect x={box.x - 14} y={box.y} width="18" height="3" rx="1" fill="#FFF" opacity="0.5" />
                </g>
            ))}

            {/* Synchronizing Pulse Particles */}
            {!reduce && (
                <motion.circle
                    r="3"
                    fill={primary}
                    animate={{ cx: [120, 45, 120], cy: [90, 45, 90] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
        </svg>
    );
}

/* 11. NEURAL SYNAPSE AI CORE ANIMATION */
function AiNeuralScene({ primary, secondary, reduce }: { primary: string; secondary: string; reduce: boolean }) {
    return (
        <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
            {/* Neural Synapse Nodes Layers */}
            {/* Layer 1 (Inputs) */}
            {[40, 75, 110, 145].map((y, i) => (
                <circle key={`l1-${i}`} cx="45" cy={y} r="7" fill={`${primary}30`} stroke={primary} strokeWidth="1.5" />
            ))}

            {/* Layer 2 (Hidden 1) */}
            {[55, 90, 125].map((y, i) => (
                <circle key={`l2-${i}`} cx="95" cy={y} r="8" fill={`${secondary}30`} stroke={secondary} strokeWidth="1.5" />
            ))}

            {/* Layer 3 (Hidden 2) */}
            {[55, 90, 125].map((y, i) => (
                <circle key={`l3-${i}`} cx="145" cy={y} r="8" fill={`${primary}30`} stroke={primary} strokeWidth="1.5" />
            ))}

            {/* Layer 4 (Output Decisions) */}
            {[70, 110].map((y, i) => (
                <circle key={`l4-${i}`} cx="195" cy={y} r="9" fill={`${secondary}40`} stroke={secondary} strokeWidth="1.8" />
            ))}

            {/* Axon Connections */}
            {[40, 75, 110, 145].map((y1) =>
                [55, 90, 125].map((y2, j) => (
                    <line key={`c1-${y1}-${j}`} x1="45" y1={y1} x2="95" y2={y2} stroke={primary} strokeWidth="0.7" opacity="0.3" />
                ))
            )}

            {[55, 90, 125].map((y1) =>
                [55, 90, 125].map((y2, j) => (
                    <line key={`c2-${y1}-${j}`} x1="95" y1={y1} x2="145" y2={y2} stroke={secondary} strokeWidth="0.8" opacity="0.35" />
                ))
            )}

            {[55, 90, 125].map((y1) =>
                [70, 110].map((y2, j) => (
                    <line key={`c3-${y1}-${j}`} x1="145" y1={y1} x2="195" y2={y2} stroke={secondary} strokeWidth="1" opacity="0.4" />
                ))
            )}

            {/* Animated Synaptic Action Potentials */}
            {!reduce && (
                <>
                    <motion.circle
                        r="3"
                        fill="#FFF"
                        animate={{ cx: [45, 95, 145, 195], cy: [75, 90, 90, 70] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.circle
                        r="3"
                        fill={secondary}
                        animate={{ cx: [45, 95, 145, 195], cy: [110, 125, 90, 110] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 0.7 }}
                    />
                </>
            )}
        </svg>
    );
}

export function ProductCanvas({
    variant = 'enterprise',
    color,
    colorful = true,
    className = '',
}: ProductCanvasProps) {
    const prefersReducedMotion = useReducedMotion();
    const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.enterprise;
    const primaryColor = color || config.primary;
    const secondaryColor = colorful ? config.secondary : primaryColor;

    return (
        <div className={`group relative flex h-full w-full items-center justify-center p-3 select-none ${className}`}>
            {/* Ambient Nebula Aura Glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-25 blur-xl transition-all duration-500 group-hover:opacity-40"
                style={{
                    background: `radial-gradient(circle, ${primaryColor} 0%, ${secondaryColor}30 50%, transparent 75%)`,
                }}
            />

            {/* Outer Glass Card Framework */}
            <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-[#071320]/80 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 group-hover:border-[#2EC4A5]/60">
                {/* Variant-Specific Bespoke Animation Scene */}
                {variant === 'enterprise' && <EnterpriseScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'commerce' && <CommerceScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'ondemand' && <OnDemandScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'care' && <CareScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'community' && <CommunityScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'design' && <DesignStudioScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'fintech' && <FintechScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'media' && <MediaStreamingScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'mobile' && <MobileRuntimeScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'saas' && <SaasCloudScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}
                {variant === 'ai' && <AiNeuralScene primary={primaryColor} secondary={secondaryColor} reduce={prefersReducedMotion} />}

                {/* Micro Category Telemetry Tag */}
                <div className="absolute right-3 bottom-2 flex items-center gap-1.5 opacity-60 transition-opacity group-hover:opacity-100">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <span className="font-mono text-[8px] font-bold tracking-widest text-white/70 uppercase">
                        {config.label}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCanvas;