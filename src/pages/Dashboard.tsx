import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Settings } from "lucide-react"
import { useContext, useEffect } from "react"
import { AuthContext, type AuthContextProps } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#7008e7",
  },
  mobile: {
    label: "Mobile",
    color: "#a684ff",
  },
} satisfies ChartConfig

const Dashboard = () => {
  const { role } = useContext(AuthContext) as AuthContextProps
  
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== "instructor") {
      navigate("/")
    }
  }, [])

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,_#ede9fe_1px,_transparent_1px),_linear-gradient(to_bottom,_#ede9fe_1px,_transparent_1px)] [background-size:40px_40px]">
      <main className="relative w-full grid grid-cols-[300px_1fr] gap-4 p-4 h-screen">
        {/* LEFT SIDEBAR */}
        <section className="">
          <div className="relative bg-violet-300/20 border border-r-4 border-b-4 border-violet-300 p-4 rounded-xl h-full flex flex-col justify-between">
            {/* Sidebar Content */}
            <div className="">
              <h2 className="text-xl font-semibold text-violet-950 mb-4">
                Navigation
              </h2>
              <ul className="space-y-2">
                <li className="text-violet-950 border border-r-4 border-b-4 border-violet-300 rounded-xl p-2 text-center cursor-pointer hover:bg-violet-300/20 transition-all duration-300">Dashboard</li>
                <li className="text-violet-950 border border-r-4 border-b-4 border-violet-300 rounded-xl p-2 text-center cursor-pointer hover:bg-violet-300/20 transition-all duration-300">Dashboard</li>
                <li className="text-violet-950 border border-r-4 border-b-4 border-violet-300 rounded-xl p-2 text-center cursor-pointer hover:bg-violet-300/20 transition-all duration-300">Dashboard</li>
                <li className="text-violet-950 border border-r-4 border-b-4 border-violet-300 rounded-xl p-2 text-center cursor-pointer hover:bg-violet-300/20 transition-all duration-300">Dashboard</li>
              </ul>
            </div>

            <div className="absolute bottom-4 left-4 text-sm text-violet-950/70 w-[calc(100%-2rem)] font-semibold">
              <div className="p-2 bg-violet-300/20 border border-r-4 border-b-4 flex items-center justify-center gap-2 border-violet-300 rounded-xl">
                <Settings size={20} />
                Profile Setting
              </div>              
            </div>
          </div>
        </section>

        {/* MAIN DASHBOARD */}
        <section>
          <div className="bg-violet-300/20 border border-r-4 border-b-4 border-violet-300 p-4 rounded-xl h-full">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-violet-300 rounded-xl p-4 shadow shadow-violet-200 text-center">
                <span className="text-2xl font-semibold block text-violet-950">
                  Total Courses
                </span>
                <span className="text-3xl font-bold block text-violet-950 mt-2">
                  24
                </span>
              </div>
              <div className="border border-violet-300 rounded-xl p-4 shadow shadow-violet-200 text-center">
                <span className="text-2xl font-semibold block text-violet-950">
                  Total Lectures
                </span>
                <span className="text-3xl font-bold block text-violet-950 mt-2">
                  132
                </span>
              </div>
              <div className="border border-violet-300 rounded-xl p-4 shadow shadow-violet-200 text-center">
                <span className="text-2xl font-semibold block text-violet-950">
                  Total Students
                </span>
                <span className="text-3xl font-bold block text-violet-950 mt-2">
                  512
                </span>
              </div>
            </div>

            {/* Grid Widgets */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl border border-r-4 border-b-4 border-violet-300 bg-white/30">
                <h3 className="text-lg font-semibold text-violet-950 mb-2">Recent Signups</h3>
                <p className="text-violet-950">+35 new this month</p>
              </div>
              <div className="p-4 rounded-xl border border-r-4 border-b-4 border-violet-300 bg-white/30">
                <h3 className="text-lg font-semibold text-violet-950 mb-2">Active Courses</h3>
                <p className="text-violet-950">12 ongoing courses</p>
              </div>
              <div className="p-4 rounded-xl border border-r-4 border-b-4 border-violet-300 bg-white/30">
                <h3 className="text-lg font-semibold text-violet-950 mb-4">Users Traffic</h3>
                <ChartContainer config={chartConfig} className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="month" stroke="#4c1d95" />
                      <YAxis stroke="#4c1d95" />
                      <Tooltip />
                      <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
