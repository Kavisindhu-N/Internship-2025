import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import myImage from '/src/assets/image.jpg';
const Hero = () => {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 py-20 gap-10">
            {/* Left Content */}
            <div className="max-w-xl w-full space-y-6 text-center lg:text-left" data-aos="fade-right">
                <CustomButton>Ready to Innovate</CustomButton>

                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="inline-block">Full Stack</span>{" "}
                    <CustomText>Developer</CustomText>
                </h1>

                <p className="text-gray-400 text-base sm:text-lg">
                    Enhancing digital experiences that are smooth, scalable, and made to impress.
                </p>

                {/* Social Icons */}
                <div className="flex justify-center lg:justify-start gap-4 pt-2">
                    <CustomButton className="p-3">
                        <FaGithub className="text-xl sm:text-2xl" />
                    </CustomButton>
                    <CustomButton className="p-3">
                        <FaLinkedin className="text-xl sm:text-2xl" />
                    </CustomButton>
                    <CustomButton className="p-3">
                        <FaInstagram className="text-xl sm:text-2xl" />
                    </CustomButton>
                </div>
            </div>

            {/* Right Side Image */}
            <div className="w-full flex justify-center" data-aos="fade-left">
                <img
                    src={myImage}
                    alt="image"
                    className="w-[150px] sm:w-[200px] md:w-[200px] lg:w-[250px] max-w-full"
                />
            </div>
        </section>
    );
};

export default Hero;
