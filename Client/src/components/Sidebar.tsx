import { useState } from "react";
import { Sidebaritem } from "./Sidebaritem";
import { Youtubeicon } from "../Icons/Youtubeicon";
import { Twittericon } from "../Icons/Twittericon";
import { Ideaicon } from "../Icons/Ideaicon";

interface SidebarProps {
  onFilterChange?: (
    filter:
      | "all"
      | "youtube"
      | "twitter"
      | "document"
      | "article"
      | "image"
      | "link"
  ) => void;
  activeFilter?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  onFilterChange,
  activeFilter = "all",
  isOpen,
  onToggle,
}: SidebarProps) {
  const handleFilterClick = (
    filter:
      | "all"
      | "youtube"
      | "twitter"
      | "document"
      | "article"
      | "image"
      | "link"
  ) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-50 transition-all duration-300 ${
          isOpen ? "w-72" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div
            className={`flex items-center gap-3 ${
              !isOpen && "lg:flex-col lg:gap-2"
            }`}
          >
            <div className="text-indigo-600">
              <Ideaicon size="lg" />
            </div>
            {isOpen && (
              <span className="text-2xl font-semibold text-gray-900 tracking-tight">
                Idealog
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="pt-6 px-4">
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3 px-3">
              Content Types
            </div>
            <div className="space-y-1">
              <Sidebaritem
                text="All Content"
                icon={<span className="text-lg">📚</span>}
                onClick={() => handleFilterClick("all")}
                active={activeFilter === "all"}
              />
              <Sidebaritem
                text="Videos"
                icon={<Youtubeicon size="md" />}
                onClick={() => handleFilterClick("youtube")}
                active={activeFilter === "youtube"}
              />
              <Sidebaritem
                text="Tweets"
                icon={<Twittericon size="md" />}
                onClick={() => handleFilterClick("twitter")}
                active={activeFilter === "twitter"}
              />
              <Sidebaritem
                text="Articles"
                icon={<span className="text-lg">📰</span>}
                onClick={() => handleFilterClick("article")}
                active={activeFilter === "article"}
              />
              <Sidebaritem
                text="Documents"
                icon={<span className="text-lg">📄</span>}
                onClick={() => handleFilterClick("document")}
                active={activeFilter === "document"}
              />
              <Sidebaritem
                text="Images"
                icon={<span className="text-lg">🖼️</span>}
                onClick={() => handleFilterClick("image")}
                active={activeFilter === "image"}
              />
              <Sidebaritem
                text="Links"
                icon={<span className="text-lg">🔗</span>}
                onClick={() => handleFilterClick("link")}
                active={activeFilter === "link"}
              />
            </div>
          </div>
        )}

        {/* Collapsed */}
        {!isOpen && (
          <div className="hidden lg:flex flex-col items-center pt-6 space-y-4">
            <button
              onClick={() => handleFilterClick("all")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "all"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="All Content"
            >
              <span className="text-xl">📚</span>
            </button>
            <button
              onClick={() => handleFilterClick("youtube")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "youtube"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Videos"
            >
              <Youtubeicon size="md" />
            </button>
            <button
              onClick={() => handleFilterClick("twitter")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "twitter"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Tweets"
            >
              <Twittericon size="md" />
            </button>
            <button
              onClick={() => handleFilterClick("article")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "article"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Articles"
            >
              <span className="text-xl">📰</span>
            </button>
            <button
              onClick={() => handleFilterClick("document")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "document"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Documents"
            >
              <span className="text-xl">📄</span>
            </button>
            <button
              onClick={() => handleFilterClick("image")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "image"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Images"
            >
              <span className="text-xl">🖼️</span>
            </button>
            <button
              onClick={() => handleFilterClick("link")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "link"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Links"
            >
              <span className="text-xl">🔗</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
