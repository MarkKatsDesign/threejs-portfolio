import { useMediaQuery } from 'react-responsive';

// Small, animated line drawings for the About cards. They share one visual
// language (thin strokes on a faint blueprint grid, gold + blue accents) and
// stay still for visitors who prefer reduced motion.

const GOLD = '#e0b052';
const BLUE = '#58a6ff';
const LINE = '#3a3a49';
const MUTED = '#62646c';

const useReducedMotion = () => useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

const BlueprintFrame = ({ children, className = '' }) => (
    <div
        className={`relative w-full overflow-hidden rounded-lg border border-black-300 bg-black-100 ${className}`}
        style={{
            backgroundImage:
                'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            backgroundPosition: 'center',
        }}
        aria-hidden="true"
    >
        {children}
    </div>
);

const Pulse = ({ path, color, dur, begin = '0s', reduced }) =>
    reduced ? null : (
        <circle r="3.2" fill={color}>
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
        </circle>
    );

const Node = ({ x, y, color = MUTED, children }) => (
    <g transform={`translate(${x} ${y})`}>
        <circle r="11" fill="#0e0e10" stroke={color} strokeWidth="1.5" />
        {children}
    </g>
);

/** A Git branch: an AI-assisted commit and a security check, merged back to main. */
export const BranchGraph = ({ className }) => {
    const reduced = useReducedMotion();
    const main = 'M 16 112 H 304';
    const branch = 'M 64 112 C 92 112 92 52 122 52 H 204 C 234 52 234 112 262 112';

    return (
        <BlueprintFrame className={className}>
            <svg viewBox="0 0 320 164" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
                <path d={main} stroke={LINE} strokeWidth="2" fill="none" />
                <path d={branch} stroke={BLUE} strokeOpacity="0.55" strokeWidth="2" fill="none" />
                <Pulse path={main} color={MUTED} dur="6s" reduced={reduced} />
                <Pulse path={branch} color={GOLD} dur="4.5s" reduced={reduced} />
                <Pulse path={branch} color={BLUE} dur="4.5s" begin="2.25s" reduced={reduced} />

                <Node x={16} y={112} />
                <Node x={64} y={112} />
                <Node x={140} y={52} color={GOLD}>
                    {/* sparkle: AI-assisted commit */}
                    <path d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" fill={GOLD} />
                </Node>
                <Node x={186} y={52} color={BLUE}>
                    {/* shield: security scan */}
                    <path d="M0 -6 L5 -4 V0.5 C5 3.6 2.7 5.6 0 6.5 C-2.7 5.6 -5 3.6 -5 0.5 V-4 Z" fill="none" stroke={BLUE} strokeWidth="1.4" />
                </Node>
                <Node x={262} y={112} color="#3fb950">
                    {/* check: merged */}
                    <path d="M-4.5 0.5 L-1.2 3.6 L4.8 -3.2" fill="none" stroke="#3fb950" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </Node>
                <Node x={304} y={112} />

                <g fill={MUTED} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9" textAnchor="middle">
                    <text x="140" y="30">copilot</text>
                    <text x="186" y="30">codeql</text>
                    <text x="262" y="140">merge</text>
                    <text x="40" y="140">main</text>
                </g>
            </svg>
        </BlueprintFrame>
    );
};

const CUBE_FACES = [
    'rotateY(0deg)',
    'rotateY(90deg)',
    'rotateY(180deg)',
    'rotateY(-90deg)',
    'rotateX(90deg)',
    'rotateX(-90deg)',
];

/** A spinning wireframe cube (3D work) feeding into a code editor (software). */
export const CubeToCode = ({ className }) => (
    <BlueprintFrame className={className}>
        <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10 px-6">
            <div className="relative h-20 w-20 shrink-0" style={{ perspective: '480px' }}>
                <div className="cube-spin absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                    {CUBE_FACES.map((rotation) => (
                        <div
                            key={rotation}
                            className="absolute inset-0 border border-[#e0b052]/70 bg-[#e0b052]/4"
                            style={{
                                transform: `${rotation} translateZ(40px)`,
                                backgroundImage:
                                    'linear-gradient(rgba(224,176,82,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(224,176,82,0.18) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            }}
                        />
                    ))}
                </div>
            </div>

            <svg viewBox="0 0 60 12" className="w-12 sm:w-16 shrink-0 overflow-visible">
                <path d="M 0 6 H 54" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" className="dash-flow" />
                <path d="M 50 1.5 L 56 6 L 50 10.5" fill="none" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <div className="w-40 sm:w-48 shrink-0 rounded-md border border-black-500 bg-black-200 shadow-lg">
                <div className="flex gap-1.5 border-b border-black-300 px-2.5 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                </div>
                <div className="space-y-2 p-3">
                    {[
                        ['w-3/4', BLUE],
                        ['w-1/2', GOLD],
                        ['w-5/6', MUTED],
                        ['w-2/3', BLUE],
                    ].map(([width, color], i) => (
                        <div
                            key={width + color}
                            className={`code-type h-1.5 rounded-full ${width}`}
                            style={{ backgroundColor: color, opacity: 0.75, animationDelay: `${i * 0.45}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    </BlueprintFrame>
);

/** An envelope line drawing with light travelling along the flap. */
export const MailGlyph = ({ className }) => {
    const reduced = useReducedMotion();
    const flap = 'M 92 46 L 160 98 L 228 46';
    return (
        <BlueprintFrame className={className}>
            <svg viewBox="0 0 320 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
                <rect x="92" y="40" width="136" height="88" rx="8" fill="#0e0e10" stroke={MUTED} strokeWidth="1.6" />
                <path d={flap} fill="none" stroke={MUTED} strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M 92 122 L 140 84 M 228 122 L 180 84" stroke={LINE} strokeWidth="1.4" />
                <Pulse path={flap} color={GOLD} dur="3.6s" reduced={reduced} />
            </svg>
        </BlueprintFrame>
    );
};
