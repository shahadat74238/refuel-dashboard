const url = "http://localhost:5000"; // backend url
export const imageUrl = ({ image, fallback }: { image: string, fallback?: string }) => {
    return image
        ? image?.startsWith("http")
            ? image
            : image?.startsWith("/")
                ? `${url}${image}`
                : `${url}/${image}`
        : fallback || "https://placehold.co/400";
};