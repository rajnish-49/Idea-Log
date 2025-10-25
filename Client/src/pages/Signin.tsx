import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/signin", {
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
        // Store the JWT token in localStorage
        localStorage.setItem("token", data.token);
        alert("Signin successful!");
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Signin failed");
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
            text="Signin"
            Fullwidth={true}
            loading={loading}
            onClick={handleSignin}
          />
        </div>
      </div>
    </div>
  );
}
