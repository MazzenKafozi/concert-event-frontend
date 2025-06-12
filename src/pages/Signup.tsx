import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
   const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Sign Up</h1>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm text-gray-300">
            Full Name
          </label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-300">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm text-gray-300">
            Password
          </label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </Button>
        
      </form>
    </div>
  );
};

export default Signup;
