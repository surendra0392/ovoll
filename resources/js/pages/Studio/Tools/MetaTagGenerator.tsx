import { Copy, Check, Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

export default function MetaTagGenerator() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');

    const titleLength = title.length;
    const descLength = description.length;

    const buildHTML = () => {
        const lines = [
            '<!-- Primary Meta Tags -->',
            `<title>${title || 'Page Title'}</title>`,
            `<meta name="title" content="${title || 'Page Title'}">`,
            `<meta name="description" content="${description || 'Page description'}">`,
            keywords && `<meta name="keywords" content="${keywords}">`,
            author && `<meta name="author" content="${author}">`,
            '',
            '<!-- Open Graph / Facebook -->',
            '<meta property="og:type" content="website">',
            url && `<meta property="og:url" content="${url}">`,
            `<meta property="og:title" content="${title || 'Page Title'}">`,
            `<meta property="og:description" content="${description || 'Page description'}">`,
            imageUrl && `<meta property="og:image" content="${imageUrl}">`,
            '',
            '<!-- Twitter -->',
            '<meta property="twitter:card" content="summary_large_image">',
            url && `<meta property="twitter:url" content="${url}">`,
            `<meta property="twitter:title" content="${title || 'Page Title'}">`,
            `<meta property="twitter:description" content="${description || 'Page description'}">`,
            imageUrl && `<meta property="twitter:image" content="${imageUrl}">`,
        ].filter(Boolean);

        return lines.join('\n');
    };

    const copyCode = async () => {
        await navigator.clipboard.writeText(buildHTML());
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left — Inputs */}
            <div className="space-y-6">
                <div>
                    <div className="mb-2 flex justify-between">
                        <Label>Page Title</Label>
                        <span
                            className={`text-xs ${titleLength > 60 ? 'font-bold text-red-500' : 'text-muted-foreground'}`}
                        >
                            {titleLength} / 60
                        </span>
                    </div>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="OVOLL | Premium Digital Growth"
                    />
                    {titleLength > 60 && (
                        <p className="mt-1 text-xs text-red-500">
                            Title is too long (over 60 chars).
                        </p>
                    )}
                </div>

                <div>
                    <div className="mb-2 flex justify-between">
                        <Label>Description</Label>
                        <span
                            className={`text-xs ${descLength > 160 ? 'font-bold text-red-500' : 'text-muted-foreground'}`}
                        >
                            {descLength} / 160
                        </span>
                    </div>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="We build world-class digital experiences..."
                        rows={3}
                    />
                    {descLength > 160 && (
                        <p className="mt-1 text-xs text-red-500">
                            Description is too long (over 160 chars).
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="mb-2 block">Keywords (comma separated)</Label>
                        <Input
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="branding, design, seo"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Author</Label>
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="OVOLL Studio"
                        />
                    </div>
                </div>

                <div>
                    <Label className="mb-2 block">Image URL (Social Sharing)</Label>
                    <Input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://ovoll.in/og-image.jpg"
                    />
                </div>

                <div>
                    <Label className="mb-2 block">Canonical URL</Label>
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://ovoll.in"
                    />
                </div>
            </div>

            {/* Right — Output */}
            <div className="space-y-4">
                <div className="mb-2 flex gap-2">
                    <Button
                        variant={viewMode === 'code' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('code')}
                    >
                        HTML Code
                    </Button>
                    <Button
                        variant={viewMode === 'preview' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('preview')}
                        className="gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        Google Preview
                    </Button>
                </div>

                {viewMode === 'code' ? (
                    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
                            <span className="font-mono text-xs text-zinc-400">
                                index.html (head)
                            </span>
                            <button
                                onClick={copyCode}
                                className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
                            >
                                {copied ? (
                                    <Check className="h-3.5 w-3.5" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <pre className="h-[400px] overflow-x-auto p-4 font-mono text-sm text-zinc-300">
                            <code>{buildHTML()}</code>
                        </pre>
                    </div>
                ) : (
                    <div className="border-border h-[442px] rounded-xl border bg-white p-6">
                        <div className="max-w-[600px] font-sans">
                            <div className="mb-1 flex items-center gap-2 text-sm text-[#202124]">
                                <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        '🌐'
                                    )}
                                </div>
                                <div>
                                    <div className="leading-tight">
                                        {url ? new URL(url).hostname : 'example.com'}
                                    </div>
                                    <div className="text-[12px] leading-tight text-[#4d5156]">
                                        {url || 'https://example.com'}
                                    </div>
                                </div>
                            </div>
                            <h3 className="mb-1 cursor-pointer text-xl font-normal text-[#1a0dab] hover:underline">
                                {title || 'Page Title Example - Your Brand'}
                            </h3>
                            <p className="text-[14px] leading-snug text-[#4d5156]">
                                {description ||
                                    'This is how your page will appear in Google search results. Make sure your title and description are compelling and within character limits.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
