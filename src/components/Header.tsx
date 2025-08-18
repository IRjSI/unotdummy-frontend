import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, LogIn, Briefcase, Plus, Brain, BriefcaseBusiness, Settings, LogOutIcon, Settings2 } from "lucide-react";
import { AuthContext, type AuthContextProps } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const { isLoggedIn, logout, user: data, loading, fetchUser } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();
    
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
  
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
  ];
  
  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUser()
    }
    
    fetchProfile()
    
  }, [])
  
  if (!isLoggedIn && loading) return null;

  return (
    <header className="bg-violet-300/20 border-b border-violet-300">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-bold text-violet-950"
        >
          U!D
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1 text-violet-950 hover:text-violet-700 transition-colors ${
                    isActive ? "font-semibold" : ""
                  }`
                }
                title={label}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            </li>
          ))
          }

          {isLoggedIn && (data?.role === "instructor" ? (<DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-1 cursor-pointer text-violet-950 hover:text-violet-700 transition-colors">
                <BriefcaseBusiness size={20} />
                <span className="hidden sm:inline">Courses</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to={"/create-course"} className="flex items-center gap-1">
                  <Plus size={16} />
                  Create Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/my-courses"} className="flex items-center gap-1">
                  <Briefcase size={16} />
                  My Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/enrolled-courses"} className="flex items-center gap-1">
                  <Brain size={16} />
                  Enrolled Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <NavLink to={"/enrolled-courses"} className={({ isActive }) =>
              `flex items-center gap-1 text-violet-950 hover:text-violet-700 transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }>
              <BriefcaseBusiness size={20} />
              <span className="hidden sm:inline">Enrolled Courses</span>
            </NavLink>
          ))
          }


          {/* Auth Action */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-1 cursor-pointer text-violet-950 hover:text-violet-700 transition-colors">
                  <div className="w-8 h-8" title={data?.name}>
                    <img src={data?.avatar} className="w-full h-full rounded-full object-cover" alt="" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to={"/profile"} className="flex items-center gap-1">
                    <Settings size={16} />
                    Manage Account
                  </Link>
                </DropdownMenuItem>
                {data?.role === "instructor" && <DropdownMenuItem>
                  <Link to={"/dashboard"} className="flex items-center gap-1">
                    <Settings2 size={16} />
                    Dashboard
                  </Link>
                </DropdownMenuItem>}
                <DropdownMenuItem>
                  <button onClick={handleLogout} className="flex items-center gap-1 text-red-500">
                    <LogOutIcon size={16} className="text-red-500" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <li>
              <Link
                to="/signin"
                className="flex items-center gap-1 text-violet-950 hover:text-violet-700 transition-colors"
                title="Login"
              >
                <LogIn size={20} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </li>
          )}

          {data?.role === "instructor" && (
            <div className="text-violet-700 font-semibold bg-violet-500/20 px-2 rounded-xl">
              <span className="hidden sm:inline">Instructor</span>
              <span className="sm:hidden inline p-2">I</span>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
