export default function BrandsCarousel() {
  const brands = [
    "Federación Patronal",
    "Sancor Seguros",
    "Rivadavia",
    "Allianz",
    "Mercantil Andina",
    "Zurich",
    "La Caja",
    "San Cristóbal",
  ];

  return (
    <div className="py-16 bg-white dark:bg-ad-dark border-y border-slate-100 dark:border-white/5 overflow-hidden shrink-0 transition-colors duration-300">
      <div className="flex animate-infinite-scroll whitespace-nowrap">
        {/* Double the list for seamless looping */}
        {[...brands, ...brands].map((brand, idx) => (
          <div 
            key={idx} 
            className="flex items-center mx-12 group"
          >
            <span className="text-sm font-black text-black dark:text-white uppercase tracking-[0.3em] transition-colors">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
