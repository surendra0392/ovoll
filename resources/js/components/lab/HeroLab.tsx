import { AnimatedText } from '@/components/ui';
import { GlassCrystalScene } from '@/components/vfx/GlassCrystal';
import { Experiment } from './Experiment';

export function HeroLab() {
    return (
        <div className="mx-auto max-w-7xl space-y-12 p-8">
            <Experiment
                id="hero-001"
                title="Cinematic Product Reveal"
                category="Hero Concept"
                stage="Prototype"
                purpose="Establish a premium, Apple-style introduction to a flagship product or feature."
                story="The user lands in complete darkness. As they move their mouse, the glass crystal gently rotates, refracting light. Large typography fades in with a magnetic pull."
                technicalNotes="Utilizes React Three Fiber with MeshTransmissionMaterial for the crystal, and Framer Motion for the staggered text reveal."
                performanceNotes="Heavy GPU cost due to 4-sample transmission material. Automatically degrades on mobile devices via SceneLoader."
                accessibilityNotes="Reduced motion halts the crystal rotation and disables the staggered text animation, snapping immediately to the final state."
                qc={{
                    tellsStory: true,
                    strengthensBrand: true,
                    improvesUsability: false, // Purely experiential
                    isMemorable: true,
                    scales: true,
                    reusable: true,
                }}
            >
                {/* Canvas Area */}
                <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

                    {/* 3D Crystal */}
                    <div className="absolute inset-0 z-0">
                        <GlassCrystalScene speed={0.5} className="h-full w-full" />
                    </div>

                    {/* Typography Layer */}
                    <div className="pointer-events-none relative z-10 mt-48 text-center">
                        <AnimatedText
                            text="Clarity."
                            variant="words"
                            as="h1"
                            className="text-8xl font-bold tracking-tighter text-white mix-blend-overlay drop-shadow-2xl md:text-9xl"
                        />
                        <AnimatedText
                            text="The next generation of design systems."
                            variant="words"
                            as="h2"
                            className="mt-6 font-medium tracking-wide text-white/60"
                        />
                    </div>
                </div>
            </Experiment>

            {/* Empty Shell for Next Experiment */}
            <Experiment
                id="hero-002"
                title="Split Screen Editor"
                category="Hero Concept"
                stage="Idea"
                purpose="Showcase the product UI alongside marketing copy."
                qc={{
                    tellsStory: false,
                    strengthensBrand: false,
                    improvesUsability: false,
                    isMemorable: false,
                    scales: false,
                    reusable: false,
                }}
            >
                <div className="flex h-[400px] items-center justify-center bg-white/5">
                    <span className="text-white/40">Sketching phase...</span>
                </div>
            </Experiment>
        </div>
    );
}
