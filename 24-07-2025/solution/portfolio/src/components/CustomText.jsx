const CustomText = ({ children }) => {
  return (
    <span className="inline-block mt-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold"  data-aos="zoom-in-up">
      {children}
    </span>
  );
};

export default CustomText;
