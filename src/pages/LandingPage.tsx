import { ArrowRight, BookOpen, Users, Award, Star, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const LandingPage = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
            <section className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-violet-300/20 rounded-full border border-violet-300 mb-8">
                        <Star className="text-violet-600 mr-2" size={16} />
                        <span className="text-violet-950 font-medium">Trusted by many learners</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-violet-950 mb-6 leading-tight">
                        Transform Your
                        <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 bg-clip-text text-transparent"> Learning</span>
                        <br />Journey Today
                    </h1>
                    
                    <p className="text-xl text-violet-950/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of education with our comprehensive learning management system. 
                        Engage, learn, and grow with interactive courses designed for your success.
                    </p>
                    
                    <div className="flex justify-center gap-4 mb-16">
                        <Link to={"/signup"} className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 text-white rounded-xl border-b-4 border-r-4 border-violet-700 hover:scale-105 transition-all duration-300 font-semibold text-lg">
                            Start Learning Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-violet-200 border-b-4 border-r-4 p-8">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-violet-950 mb-2">500+</div>
                                <div className="text-violet-950/60 font-medium">Courses Available</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-violet-950 mb-2">98%</div>
                                <div className="text-violet-950/60 font-medium">Completion Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-violet-950 mb-2">24/7</div>
                                <div className="text-violet-950/60 font-medium">Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-violet-100/50 to-violet-200/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-violet-950 mb-6">
                            Why Choose U!Dummy?
                        </h2>
                        <p className="text-xl text-violet-950/70 max-w-2xl mx-auto">
                            Discover the features that make learning engaging, effective, and enjoyable for everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-violet-200 border-b-4 border-r-4 p-8 hover:scale-105 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl flex items-center justify-center mb-6 border-b-2 border-r-2 border-violet-700 group-hover:rotate-3 transition-transform duration-300">
                                <BookOpen className="text-white" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-violet-950 mb-4">Interactive Content</h3>
                            <p className="text-violet-950/70 mb-6">
                                Engage with multimedia lessons, quizzes, and hands-on projects that make learning memorable and fun.
                            </p>
                            <div className="flex items-center text-violet-600 font-medium">
                                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-violet-200 border-b-4 border-r-4 p-8 hover:scale-105 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl flex items-center justify-center mb-6 border-b-2 border-r-2 border-violet-700 group-hover:rotate-3 transition-transform duration-300">
                                <Users className="text-white" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-violet-950 mb-4">Collaborative Learning</h3>
                            <p className="text-violet-950/70 mb-6">
                                Connect with peers, join study groups, and learn together in our vibrant community environment.
                            </p>
                            <div className="flex items-center text-violet-600 font-medium">
                                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-violet-200 border-b-4 border-r-4 p-8 hover:scale-105 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl flex items-center justify-center mb-6 border-b-2 border-r-2 border-violet-700 group-hover:rotate-3 transition-transform duration-300">
                                <Award className="text-white" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-violet-950 mb-4">Certified Programs</h3>
                            <p className="text-violet-950/70 mb-6">
                                Earn industry-recognized certificates and badges that showcase your skills to employers worldwide.
                            </p>
                            <div className="flex items-center text-violet-600 font-medium">
                                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 rounded-2xl border-b-4 border-r-4 border-violet-700 p-12 md:p-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of learners who have transformed their careers with U!Dummy. 
                            Your future starts with a single click.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to={"/signup"} className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-950 rounded-xl border-b-4 border-r-4 border-violet-200 hover:scale-105 transition-all duration-300 font-semibold text-lg">
                                Get Started Free
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl border-b-4 border-r-4 border-white/30 hover:scale-105 transition-all duration-300 font-semibold text-lg">
                                View Pricing
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 mt-6 text-white/80">
                            <CheckCircle size={16} />
                            <span>No credit card required</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-violet-950 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl flex items-center justify-center border-b-2 border-r-2 border-violet-400">
                                <BookOpen className="text-white" size={20} />
                            </div>
                            <span className="text-2xl font-bold">U!Dummy</span>
                        </div>
                    </div>
                    
                    <div className="text-center text-white/60">
                        <p>&copy; 2025 U!Dummy. All rights reserved. Empowering learners worldwide.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
