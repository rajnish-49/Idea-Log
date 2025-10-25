import { useState } from "react";
import { Crossicon } from "../Icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onContentAdded?: () => void;
}

function CreateContentModal({
  open,
  onClose,
  onContentAdded,
}: CreateContentModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !link.trim()) {
      alert("Please fill in both title and link");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please sign in first");
        window.location.href = "/signin";
        return;
      }

      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          link,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Content added successfully!");
        setTitle("");
        setLink("");
        onClose();
        if (onContentAdded) {
          onContentAdded();
        }
      } else if (response.status === 401) {
        // Token expired or invalid
        alert("Session expired. Please sign in again.");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      } else {
        // Other errors
        alert(
          data.error || `Failed to add content (Error: ${response.status})`
        );
      }
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div onClick={onClose} className="flex justify-end cursor-pointer mb-4">
          <Crossicon size="md" />
        </div>

        <h2 className="text-xl font-semibold mb-4">Add New Content</h2>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Link (URL: YouTube, Twitter, Article, Image, Document, etc.)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="primary"
            text="Submit"
            size="md"
            onClick={handleSubmit}
            loading={loading}
            Fullwidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateContentModal;
export { CreateContentModal };
