'use client'
const LiveDate = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <p className="font-semibold text-[#1D271F] text-[10px]">{date}</p>
    </div>
  );
};

export default LiveDate;
