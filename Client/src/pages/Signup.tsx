import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        // Redirect to signin page or dashboard
        window.location.href = "/signin";
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            size="md"
            text="Signup"
            Fullwidth={true}
            loading={loading}
            onClick={handleSignup}
          />
        </div>
      </div>
    </div>
  );
}
