import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending signin request for username:", username);
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
      console.log("Signin response:", data);

      if (response.ok && data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-sand-50 via-white to-teal-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl border-2 border-sand-200 shadow-xl min-w-96 p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 font-medium">
            Sign in to your Idealog account
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
            text="Sign In"
            Fullwidth={true}
            loading={loading}
            onClick={handleSignin}
          />
        </div>
        <div className="mt-6 text-center">
          <a
            href="/signup"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline"
          >
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
