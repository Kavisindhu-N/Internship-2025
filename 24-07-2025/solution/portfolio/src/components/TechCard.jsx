const TechCard = ({ title, icon: Icon, width = 'w-32', height = 'h-32' }) => {
  return (
    <div className={`relative group ${width} ${height} m-2 cursor-pointer`}>
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 blur-md opacity-30 group-hover:blur-lg group-hover:opacity-50 transition duration-500"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white p-4 transform transition-transform duration-300 group-hover:scale-105" data-aos="zoom-out">
        {Icon && <Icon className="text-4xl sm:text-5xl text-purple-400 mb-2" data-aos="zoom-in"/>}
        <span className="text-sm text-center font-medium mt-2"data-aos="zoom-in">{title}</span>
      </div>
    </div>
  );
};

export default TechCard;
