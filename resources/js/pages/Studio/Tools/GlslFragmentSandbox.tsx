import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

const DEFAULT_SHADER = `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 col = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0.0, 2.0, 4.0));
    gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

export default function GlslFragmentSandbox() {
    const [source, setSource] = useState(DEFAULT_SHADER);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const raf = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        // Run the imperative setup inside a deferred frame so every setState
        // (WebGL errors, compile errors) fires from a callback, not synchronously
        // within the effect body (React 19 rule: no sync setState in effects).
        const rafId = requestAnimationFrame(() => {
            const gl = canvas.getContext('webgl');

            if (!gl) {
                setError('WebGL not supported in this browser.');

                return;
            }

            canvas.width = canvas.offsetWidth;
            canvas.height = 224;

            const compile = (type: number, src: string) => {
                const sh = gl.createShader(type)!;
                gl.shaderSource(sh, src);
                gl.compileShader(sh);

                if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
                    throw new Error(gl.getShaderInfoLog(sh) || 'compile error');
                }

                return sh;
            };

            let program: WebGLProgram;

            try {
                const vs = compile(gl.VERTEX_SHADER, VERT);
                const fs = compile(gl.FRAGMENT_SHADER, source);
                program = gl.createProgram()!;
                gl.attachShader(program, vs);
                gl.attachShader(program, fs);
                gl.linkProgram(program);

                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    throw new Error(gl.getProgramInfoLog(program) || 'link error');
                }

                setError(null);
            } catch (e) {
                setError((e as Error).message);

                return;
            }

            gl.useProgram(program);
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 3, -1, -1, 3]),
                gl.STATIC_DRAW,
            );
            const loc = gl.getAttribLocation(program, 'a_pos');
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

            const uTime = gl.getUniformLocation(program, 'u_time');
            const uRes = gl.getUniformLocation(program, 'u_resolution');
            const start = performance.now();

            const render = () => {
                gl.uniform1f(uTime, (performance.now() - start) / 1000);
                gl.uniform2f(uRes, canvas.width, canvas.height);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
                raf.current = requestAnimationFrame(render);
            };
            render();
        });

        return () => {
            cancelAnimationFrame(rafId);
            cancelAnimationFrame(raf.current);
        };
    }, [source]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <canvas
                ref={canvasRef}
                className="bg-surface-raised h-56 w-full border border-white/10"
            />

            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Fragment Shader (GLSL)
                </Label>
                <Textarea
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    rows={8}
                    className="font-mono text-[11px]"
                    spellCheck={false}
                />
            </div>

            {error && (
                <pre className="overflow-x-auto border border-red-500/30 bg-red-500/5 p-3 font-mono text-[10px] whitespace-pre-wrap text-red-300">
                    {error}
                </pre>
            )}
            <p className="font-mono text-[10px] text-white/40">
                A full-screen triangle beats a quad — one fewer vertex and no diagonal seam.
                Uniforms: u_time, u_resolution.
            </p>
        </div>
    );
}
