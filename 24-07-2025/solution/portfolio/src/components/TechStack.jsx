import CustomText from "./CustomText";
import TechCard from "./TechCard";
import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTailwindcss,
    SiExpress,
    SiNodedotjs,
    SiReact,
    SiMongodb,
    SiTypescript,
    SiMui,
    SiBootstrap
} from "react-icons/si";

const techList = [
    { title: "HTML", icon: SiHtml5 },
    { title: "CSS", icon: SiCss3 },
    { title: "JavaScript", icon: SiJavascript },
    { title: "Tailwind CSS", icon: SiTailwindcss },
    { title: "Express JS", icon: SiExpress },
    { title: "Node JS", icon: SiNodedotjs },
    { title: "React", icon: SiReact },
    { title: "MongoDB", icon: SiMongodb },
    { title: "TypeScript", icon: SiTypescript },
    { title: "Material UI", icon: SiMui },
    { title: "Bootstrap", icon: SiBootstrap }
];

const TechStack = () => {
    return (
        <section className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-10">
            <CustomText>Tech Stack</CustomText>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl w-full">
                {techList.map((tech, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center min-w-[96px] sm:min-w-[110px] max-w-[140px]" 
                    >
                        <TechCard {...tech} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
