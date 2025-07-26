import CustomButton from "./CustomButton";
import CustomText from "./CustomText";

const About = () => {
  return (
    <div className="flex flex-col items-center  px-4 w-full max-w-7xl">
      <CustomText>About Me</CustomText>

      <p className="text-gray-300 mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed w-full max-w-4xl" data-aos="zoom-in">
        Hello, I'm Kavisindhu — passionate about building smart and scalable web & mobile applications. I've completed a full-stack development course and constantly explore new technologies to refine my skills. Focused on continuous learning, I aim to transition into the IT industry by 2027 and eventually move towards AI and data science.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 flex-wrap w-full">
        <CustomButton className="px-6 py-3 text-sm sm:text-base whitespace-nowrap">
          Download CV
        </CustomButton>
        <CustomButton
          className="px-6 py-3 text-sm sm:text-base whitespace-nowrap"
          onClick={() => {
            document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View Projects
        </CustomButton>
      </div>
    </div>
  );
};

export default About;
