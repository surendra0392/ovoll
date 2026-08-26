import { motion } from 'framer-motion';
import { SEO } from '@/components/seo';

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export function PageLayout({ children, title, description, className }: PageLayoutProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            <SEO title={title} description={description} />
            {children}
        </motion.div>
    );
}
