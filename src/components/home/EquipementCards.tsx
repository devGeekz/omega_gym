/* eslint-disable @next/next/no-img-element */
import { Equipments } from "./Constants";

const EquipmentCards = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in duration-500">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Premium Equipment
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            State-of-the-art fitness equipment designed to help you achieve your goals faster and safer.
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Equipments.map((item, idx) => (
            <div
              key={idx}
              className="group animate-in fade-in duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-border/50 transition-all duration-300 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-56 bg-linear-to-br from-primary/10 to-muted-foreground/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/20 group-hover:to-background/40 transition-all duration-300 z-10" />
                  <img
                    src={`${item.imaggeUrl}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold uppercase mb-3 text-card-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground/80 mb-6 flex-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <button className="px-6 py-3 bg-linear-to-r from-primary to-primary/90 text-primary-foreground rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCards;
