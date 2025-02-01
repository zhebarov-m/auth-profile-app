import ContentLoader from 'react-content-loader';

export const CustomSkeleton = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="10" rx="5" ry="5" width="180" height="28" />
        <rect x="0" y="50" rx="5" ry="5" width="330" height="56" />
        <rect x="0" y="130" rx="5" ry="5" width="350" height="36" />
    </ContentLoader>
);
