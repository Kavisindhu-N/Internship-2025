import { FaLeaf, FaShieldAlt, FaFlask } from 'react-icons/fa';
import TechCard from './TechCard';
import CustomText from './CustomText';

const projects = [
  {
    icon: FaLeaf,
    title: (
      <>
        <strong className="block text-xl mb-2">Soil Moisture Monitoring System using IOT</strong>
        <span className="text-base font-light">
          Automatically calculates soil moisture. Controls pump based on water level, reducing human effort.
        </span>
      </>
    )
  },
  {
    icon: FaShieldAlt,
    title: (
      <>
        <strong className="block text-xl mb-2">Detecting Cyber Defamation</strong>
        <span className="text-base font-light">
          Detects bullying content from the internet and filters it using ML algorithms.
        </span>
      </>
    )
  },
  {
    icon: FaFlask,
    title: (
      <>
        <strong className="block text-xl mb-2">LIMS (Laboratory Information Management System)</strong>
        <span className="text-base font-light">
          Virtualizes lab info and shares real-time data for effective management.
        </span>
      </>
    )
  }
];

const ProjectSection = () => {
  return (
    <div id="project" className="w-full px-4 flex flex-col items-center justify-center gap-6">
      <CustomText>Projects</CustomText>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <TechCard
            key={index}
            title={project.title}
            icon={project.icon}
            width="w-70"
            height="min-h-90"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
