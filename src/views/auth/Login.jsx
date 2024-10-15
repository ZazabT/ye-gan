import { useState, useEffect } from "react";
import userAuthStore from "../../stores/UserAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, error, loading, } = userAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 // Run effect when isAuthenticated changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!email || !password) {
            return;
        }

        try {
            await login(email, password);

            if (!error) {
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded shadow-lg w-96">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Login</h2>
                {loading && <p className="text-center">Loading...</p>} 
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded transition duration-200 ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/register" className="text-blue-600 hover:underline">
                        Don&apos;t have an account? Register
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
