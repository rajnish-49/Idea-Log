import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import Createcontentmodel from "../components/Createcontentmodel";
import { Sidebar } from "../components/Sidebar";

interface Content {
  _id: string;
  Title: string;
  link: string;
  type?: "twitter" | "youtube" | "document" | "article" | "image" | "link";
}

export function Dashboard() {
  const [modalopen, setmodalopen] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [filterType, setFilterType] = useState<Content["type"] | "all">("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch user's content from backend
  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/signin";
        return;
      }

      const response = await fetch("http://localhost:3000/api/v1/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched contents from backend:", data);

        // Determine type based on URL
        const contentsWithType = data.map((item: any) => {
          const url = item.link.toLowerCase();
          let type: Content["type"] = "link"; // default

          if (url.includes("twitter.com") || url.includes("x.com")) {
            type = "twitter";
          } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
            type = "youtube";
          } else if (
            url.endsWith(".pdf") ||
            url.includes("docs.google.com") ||
            url.includes("drive.google.com")
          ) {
            type = "document";
          } else if (
            url.includes("medium.com") ||
            url.includes("dev.to") ||
            url.includes("/blog") ||
            url.includes("/article")
          ) {
            type = "article";
          } else if (
            url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
            url.includes("imgur.com") ||
            url.includes("unsplash.com")
          ) {
            type = "image";
          }

          return { ...item, type };
        });

        console.log("Processed contents with types:", contentsWithType);
        setContents(contentsWithType);
        console.log("State updated! Total items:", contentsWithType.length);
      } else if (response.status === 401) {
        // Only logout on authentication errors
        localStorage.removeItem("token");
        window.location.href = "/signin";
      } else {
        // For other errors, just log them
        console.error("Error fetching contents:", response.status);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentAdded = async () => {
    console.log("Content added, refreshing list...");
    setLoading(true); // loading 
    await fetchContents(); // Refresh 
    console.log("Refresh complete, contents state:", contents);
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contentId }),
      });

      if (response.ok) {
        fetchContents(); // Refresh after deleting.
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleShareBrain = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ share: true }),
      });

      if (response.ok) {
        const data = await response.json();
        const fullLink = `${window.location.origin}${data.link}`;
        setShareLink(fullLink);
        setShowShareModal(true);
      }
    } catch (error) {
      console.error("Error sharing brain:", error);
      alert("Failed to generate share link");
    }
  };

  const copyShareLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard!");
    }
  };

  // Filter contents based on selected type
  const filteredContents =
    filterType === "all"
      ? contents
      : contents.filter((content) => content.type === filterType);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar
        onFilterChange={setFilterType}
        activeFilter={filterType}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-4 ${
          sidebarOpen ? "left-64" : "left-12 lg:left-12"
        } z-50 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-300`}
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          )}
        </svg>
      </button>

      <div
        className={`p-6 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0 lg:ml-20"
        }`}
      >
        <Createcontentmodel
          open={modalopen}
          onClose={() => setmodalopen(false)}
          onContentAdded={handleContentAdded}
        />

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                All Content
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {contents.length} {contents.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="md"
                text="Add Content"
                StartIcon={
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
                onClick={() => setmodalopen(true)}
              />
              <Button
                variant="secondary"
                size="md"
                text="Share"
                StartIcon={
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                }
                onClick={handleShareBrain}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <p className="text-sm text-gray-500 mt-4">
              Loading your content...
            </p>
          </div>
        ) : filteredContents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">
              {contents.length === 0
                ? "No content found"
                : `No ${filterType} content found`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredContents.map((content) => (
              <Card
                key={content._id}
                type={content.type || "link"}
                link={content.link}
                title={content.Title}
                onDelete={() => handleDeleteContent(content._id)}
              />
            ))}
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
              <h2 className="text-xl font-semibold mb-4">Share Your Brain</h2>
              <p className="text-sm text-gray-600 mb-4">
                Anyone with this link can view your shared content:
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={shareLink || ""}
                  readOnly
                  aria-label="Share link"
                  className="flex-1 px-4 py-2 border rounded bg-gray-50 text-sm"
                />
                <Button
                  variant="primary"
                  size="sm"
                  text="Copy"
                  onClick={copyShareLink}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  text="Close"
                  onClick={() => setShowShareModal(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
