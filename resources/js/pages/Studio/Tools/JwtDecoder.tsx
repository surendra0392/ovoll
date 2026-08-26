import { useEffect, useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

const SAMPLE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTg5MzQ1NjAwMH0.dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao';

function decodeSegment(segment: string): Record<string, unknown> | null {
    try {
        const padded = segment.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(
            atob(padded)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''),
        );

        return JSON.parse(json);
    } catch {
        return null;
    }
}

export default function JwtDecoder() {
    const [token, setToken] = useState(SAMPLE);
    // `Date.now()` is impure, so it cannot run during render. Capture it in
    // state (refreshed every 30s) and compare against that.
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = setTimeout(() => setNow(Date.now()), 30_000);

        return () => clearTimeout(timer);
    }, []);

    const decoded = useMemo(() => {
        const parts = token.trim().split('.');

        if (parts.length < 2) {
            return null;
        }

        const header = decodeSegment(parts[0]!);
        const payload = decodeSegment(parts[1]!);

        if (!header || !payload) {
            return null;
        }

        return { header, payload, hasSignature: parts.length === 3 && parts[2]!.length > 0 };
    }, [token]);

    const exp = decoded?.payload?.exp as number | undefined;
    const isExpired = typeof exp === 'number' ? exp * 1000 < now : null;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Encoded Token
                </Label>
                <Textarea
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    rows={4}
                    resize="vertical"
                    className="font-mono text-xs break-all"
                    placeholder="Paste a JWT here..."
                />
                <p className="font-mono text-[10px] text-white/40">
                    Decoded entirely in your browser — the token is never sent anywhere.
                </p>
            </div>

            {!decoded ? (
                <div className="border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs text-red-300">
                    Not a valid JWT. Expecting header.payload.signature.
                </div>
            ) : (
                <div className="space-y-4">
                    {isExpired !== null && (
                        <div
                            className={`flex items-center gap-2 border p-3 font-mono text-[11px] ${
                                isExpired
                                    ? 'border-red-500/30 bg-red-500/5 text-red-300'
                                    : 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-[#2EC4A5]'
                            }`}
                        >
                            <span className="h-2 w-2 rounded-full bg-current" />
                            {isExpired
                                ? 'Expired'
                                : `Valid until ${new Date((exp as number) * 1000).toLocaleString()}`}
                        </div>
                    )}
                    <div className="space-y-2">
                        <span className="font-mono text-[10px] tracking-widest text-[#00D1FF] uppercase">
                            Header
                        </span>
                        <pre className="bg-surface-raised/60 overflow-x-auto border border-white/5 p-4 font-mono text-[11px] text-white/70">
                            {JSON.stringify(decoded.header, null, 2)}
                        </pre>
                    </div>
                    <div className="space-y-2">
                        <span className="font-mono text-[10px] tracking-widest text-[#00D1FF] uppercase">
                            Payload
                        </span>
                        <pre className="bg-surface-raised/60 overflow-x-auto border border-white/5 p-4 font-mono text-[11px] text-white/70">
                            {JSON.stringify(decoded.payload, null, 2)}
                        </pre>
                    </div>
                    <p className="font-mono text-[10px] text-white/40">
                        Signature {decoded.hasSignature ? 'present' : 'missing'} — a decoded JWT is
                        signed, not encrypted. Never put secrets in the payload.
                    </p>
                </div>
            )}
        </div>
    );
}
