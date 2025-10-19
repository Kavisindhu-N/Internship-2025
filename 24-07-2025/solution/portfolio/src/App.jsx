import Navbar from "./components/Navbar";
import AboutLayout from "./layout/AboutLayout";
import Home from "./layout/Home";
import ProjectLayout from "./layout/ProjectLayout";
import TechStackLayout from "./layout/TechStackLayout";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-[#18012c] to-[#020202] text-white w-full ">
      <Navbar />
      <Home />
      <AboutLayout />
      <TechStackLayout />
      <ProjectLayout />
    </div>
  );
}

export default App;
