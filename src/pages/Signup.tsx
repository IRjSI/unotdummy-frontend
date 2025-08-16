import axios from "axios"
import { ArrowRight, ChevronDown, Eye, EyeClosed, Lock, Mail, User, UserCog } from "lucide-react"
import { useContext, useState } from "react"
import { AuthContext, type AuthContextProps } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const { isLoggedIn, login } = useContext(AuthContext) as AuthContextProps
    const navigate = useNavigate()
    
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    })

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, formData)

            if (!res.data.success) {
                setError("signup failed")
            }

            login(res.data.data.user.role)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleOAuth = () => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const queryParams = new URLSearchParams({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            redirect_uri: "http://localhost:5173/oauth/callback",
            response_type: "code",
            scope: "openid email profile",
            access_type: "offline",
            prompt: "consent"
        });
        window.location.href = `${googleAuthUrl}?${queryParams.toString()}`;
    };

    if (isLoggedIn) {
        navigate("/")
    }


  return (
    <div className="min-h-screen flex w-screen">
        <main className="relative flex flex-col items-center justify-center w-full py-4">
            <div className="w-24 h-24 rounded-full blur-3xl absolute top-4 left-4 bg-violet-300 animate-pulse" />
            <div className="w-24 h-24 rounded-full blur-3xl absolute bottom-4 right-4 bg-purple-300 animate-pulse" />

            <div className="relative inline-block mb-8">
                <h1 className="absolute top-0.5 left-0.5 text-4xl font-semibold text-violet-500">
                    Signup
                </h1>
                <h1 className="relative text-4xl font-semibold text-violet-300">
                    Signup
                </h1>
            </div>

            <section className="container mx-auto flex flex-col items-center justify-center p-4">

                <div className="max-w-xl w-full">
                    <button className="flex w-full items-center justify-center gap-3 px-4 py-3 bg-violet-600 border border-r-4 border-b-4 rounded-xl border-white text-white font-medium transition-all duration-300 cursor-pointer" onClick={handleOAuth}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                    </button>
                </div>

                <div className="w-full max-w-xl flex items-center my-4">
                    <div className="flex-1 h-[2px] bg-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
                    <div className="flex-1 h-[2px] bg-gray-300"></div>
                </div>

                <form className="text-violet-950 flex flex-col items-center justify-center space-y-4 bg-white/50 rounded-xl border max-w-xl p-16 border-b-4 border-r-4 border-violet-300 w-full" onSubmit={submitHandler}>

                    <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                        <div className="relative group">
                            <User size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                            <input
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                                type="text"
                                placeholder="Your name"
                                required
                                className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                        <div className="relative group">
                            <Mail size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                                type="email"
                                placeholder="example@gmail.com"
                                required
                                className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="role" className="block text-sm font-semibold mb-2">Role</label>
                        <div className="relative group">
                            <UserCog size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                            <select
                                name="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none"
                            >
                                <option value="select">Select</option>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
                        <div className="relative group">
                            <Lock size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                            <input
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                required
                                className="pl-12 pr-12 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                            />
                            {showPassword ? 
                                <Eye size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> 
                                : 
                                <EyeClosed size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                            }
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="group">
                            <button 
                                className="flex items-center justify-center gap-2 py-4 px-6 w-full font-semibold text-lg bg-gradient-to-r hover:scale-105 transition-all duration-300 border-b-4 border-r-4 border-violet-950 from-violet-600 via-violet-500 to-violet-600 rounded-xl"
                                type="submit"
                            >
                                {loading ? "Wait..." : "Next"}
                                <ArrowRight size={20} className="text-violet-950 duration-300 cursor-pointer group-hover:rotate-360 transition-all" />
                            </button>
                        </div>
                    </div>

                    {error && <div className="w-full">
                        <p className="text-red-500">{error}</p>
                    </div>}

                </form>
                
            </section>
        </main>
    </div>
  )
}

export default Signup