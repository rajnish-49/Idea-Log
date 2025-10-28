import { ShareIcon } from "../Icons/Shareicon";
import { Crossicon } from "../Icons/Crossicon";

interface Cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "article" | "image" | "link";
  onDelete?: () => void;
}

export function Card({ title, link, type, onDelete }: Cardprops) {
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = type === "youtube" ? getYouTubeVideoId(link) : null;

  // Copy link to clipboard
  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback method for older browsers or HTTP
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      // Show a brief success indicator
      const button = e.currentTarget as HTMLElement;
      const originalColor = button.className;
      button.classList.add("text-green-600");
      setTimeout(() => {
        button.className = originalColor;
      }, 1000);

      // Log to console
      console.log("✅ Link copied:", link);
    } catch (error) {
      console.error("❌ Copy failed:", error);
      // Just show visual feedback that it failed (turn red briefly)
      const button = e.currentTarget as HTMLElement;
      button.classList.add("text-red-600");
      setTimeout(() => {
        button.classList.remove("text-red-600");
      }, 1000);
    }
  };

  // Get icon and color based on type
  const getTypeStyles = () => {
    switch (type) {
      case "youtube":
        return {
          icon: "🎥",
          color: "bg-rose-50 border-rose-300",
          label: "YouTube Video",
        };
      case "twitter":
        return {
          icon: "🐦",
          color: "bg-sky-50 border-sky-300",
          label: "Twitter/X Post",
        };
      case "document":
        return {
          icon: "📄",
          color: "bg-amber-50 border-amber-300",
          label: "Document",
        };
      case "article":
        return {
          icon: "📰",
          color: "bg-emerald-50 border-emerald-300",
          label: "Article",
        };
      case "image":
        return {
          icon: "🖼️",
          color: "bg-violet-50 border-violet-300",
          label: "Image",
        };
      default:
        return {
          icon: "🔗",
          color: "bg-slate-50 border-slate-300",
          label: "Link",
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div className="p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl border-2 border-sand-200 max-w-96 min-w-72 w-full hover:-translate-y-1 hover:border-teal-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center text-sm font-semibold text-slate-800 flex-1">
          <span className="line-clamp-1">{title}</span>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <div
            onClick={copyToClipboard}
            className="text-slate-500 hover:text-teal-600 cursor-pointer transition-colors"
            title="Copy link"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          {onDelete && (
            <div
              onClick={onDelete}
              className="text-slate-500 hover:text-rose-600 cursor-pointer transition-colors"
              title="Delete"
            >
              <Crossicon size="md" />
            </div>
          )}
        </div>
      </div>

      {/* Content - Fixed height for uniformity */}
      <div className="mt-4">
        {type === "youtube" && videoId && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-sand-200">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {type === "twitter" && (
          <div
            className={`relative w-full rounded-lg border-2 p-4 ${typeStyles.color}`}
          >
            <p className="text-sm text-slate-700 mb-2 flex items-center gap-2 font-semibold">
              <span className="text-lg">{typeStyles.icon}</span>
              {typeStyles.label}
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 hover:underline text-sm break-all font-medium"
            >
              View on Twitter →
            </a>
          </div>
        )}

        {type === "document" && (
          <div
            className={`relative w-full rounded-lg border-2 p-4 ${typeStyles.color}`}
          >
            <p className="text-sm text-slate-700 mb-2 flex items-center gap-2 font-semibold">
              <span className="text-lg">{typeStyles.icon}</span>
              {typeStyles.label}
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 hover:underline text-sm break-all font-medium"
            >
              Open Document →
            </a>
          </div>
        )}

        {type === "article" && (
          <div
            className={`relative w-full rounded-lg border-2 p-4 ${typeStyles.color}`}
          >
            <p className="text-sm text-slate-700 mb-2 flex items-center gap-2 font-semibold">
              <span className="text-lg">{typeStyles.icon}</span>
              {typeStyles.label}
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 hover:underline text-sm break-all font-medium"
            >
              Read Article →
            </a>
          </div>
        )}

        {type === "image" && (
          <div
            className={`relative w-full rounded-lg border-2 overflow-hidden ${typeStyles.color}`}
          >
            <img
              src={link}
              alt={title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = "none";
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.classList.remove("hidden");
                }
              }}
            />
            <div className="hidden p-4">
              <p className="text-sm text-slate-700 mb-2 flex items-center gap-2 font-semibold">
                <span className="text-lg">{typeStyles.icon}</span>
                {typeStyles.label}
              </p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 hover:underline text-sm break-all font-medium"
              >
                View Image →
              </a>
            </div>
          </div>
        )}

        {type === "link" && (
          <div
            className={`relative w-full rounded-lg border-2 p-4 ${typeStyles.color}`}
          >
            <p className="text-sm text-slate-700 mb-2 flex items-center gap-2 font-semibold">
              <span className="text-lg">{typeStyles.icon}</span>
              {typeStyles.label}
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 hover:underline text-sm break-all font-medium"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
