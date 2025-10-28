import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    const apiUrl = "http://localhost:3000/api/v1/signup";

    try {
      // First check if server is reachable
      try {
        const serverCheck = await fetch("http://localhost:3000/");
        if (!serverCheck.ok) {
          throw new Error("Server is not responding properly");
        }
      } catch (e) {
        console.error("Server check failed:", e);
        alert(
          "Cannot connect to server. Please ensure the server is running on port 3000"
        );
        setLoading(false);
        return;
      }

      console.log(
        "Server is reachable, attempting signup with username:",
        username
      );
      const response = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log("Received response:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        if (data.token) {
          console.log("Signup successful, storing token");
          localStorage.setItem("token", data.token);
          // Store user info if available
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          window.location.href = "/dashboard";
        } else {
          console.log("No token received, redirecting to signin");
          window.location.href = "/signin";
        }
      } else {
        const errorMessage =
          data.error ||
          (response.status === 409
            ? "Username already exists"
            : "Signup failed. Please try again.");
        console.error("Signup failed:", errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Network or parsing error during signup:", error);
      alert(
        "Connection error. Please check if the server is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-sand-50 via-white to-teal-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl border-2 border-sand-200 shadow-xl min-w-96 p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h1>
          <p className="text-slate-600 font-medium">
            Start organizing your ideas today
          </p>
        </div>
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
            text="Sign Up"
            Fullwidth={true}
            loading={loading}
            onClick={handleSignup}
          />
        </div>
        <div className="mt-6 text-center">
          <a
            href="/signin"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline"
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
