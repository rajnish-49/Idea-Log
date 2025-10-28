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
        className={`h-screen bg-white fixed left-0 top-0 z-50 transition-all duration-300 ${
          isOpen ? "w-72" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="px-6 py-6 bg-gradient-to-br from-sand-50 to-white">
          <div
            className={`flex items-center gap-3 ${
              !isOpen && "lg:flex-col lg:gap-2"
            }`}
          >
            <div className="text-teal-600">
              <Ideaicon size="lg" />
            </div>
            {isOpen && (
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Idealog
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="pt-6 px-4">
            <div className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-3 px-3">
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
            <div className="mt-6 border-t border-sand-200 pt-4 px-1">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/signin";
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-sand-100 transition-colors"
              >
                <span className="text-lg"></span>
                <span>Logout</span>
              </button>
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
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="All Content"
            >
              <span className="text-xl">📚</span>
            </button>
            <button
              onClick={() => handleFilterClick("youtube")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "youtube"
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="Videos"
            >
              <Youtubeicon size="md" />
            </button>
            <button
              onClick={() => handleFilterClick("twitter")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "twitter"
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="Tweets"
            >
              <Twittericon size="md" />
            </button>
            <button
              onClick={() => handleFilterClick("article")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "article"
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="Articles"
            >
              <span className="text-xl">📰</span>
            </button>
            <button
              onClick={() => handleFilterClick("document")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "document"
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="Documents"
            >
              <span className="text-xl">📄</span>
            </button>
            <button
              onClick={() => handleFilterClick("image")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "image"
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="Images"
            >
              <span className="text-xl">🖼️</span>
            </button>
            <button
              onClick={() => handleFilterClick("link")}
              className={`p-2 rounded-lg transition-all ${
                activeFilter === "link"
                  ? "bg-teal-50 text-teal-600 shadow-sm"
                  : "text-slate-600 hover:bg-sand-100"
              }`}
              title="Links"
            >
              <span className="text-xl">🔗</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/signin";
              }}
              className="p-2 rounded-lg transition-all text-slate-600 hover:bg-sand-100"
              title="Logout"
            >
              <span className="text-xl">🚪</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
