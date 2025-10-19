const CustomButton = ({ children , onClick, className='' }) => {
  return (
    <div className='relative group inline-block ' onClick={onClick}>
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-md opacity-30 group-hover:blur-lg group-hover:opacity-50 transition duration-500"></div>
      <div className={`relative px-5 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white ${className}`}>
        <button className="font-medium text-purple-400">
          {children}
        </button>
      </div>
    </div>
  );
};

export default CustomButton;
