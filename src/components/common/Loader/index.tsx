import React from "react";

type LoaderProps = {
  loading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center w-full h-screen bg-white/50">
      <div className="sk-fading-circle">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={`sk-circle${index + 1} sk-circle`}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
