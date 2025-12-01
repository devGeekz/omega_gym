/* eslint-disable @next/next/no-img-element */
import { Equipments } from "./Constants";

const EquipmentCards = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-foreground">
            Premium Equipment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art fitness equipment designed to help you achieve your
            goals faster and safer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Equipments.map((item, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer"
            >
              <div className="h-48 bg-linear-to-br from-primary to-muted-foreground/50 flex items-center justify-center">
                <img
                  src={`${item.imaggeUrl}`}
                  alt="hero image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold uppercase mb-3 text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <button className="px-6 py-3 bg-destructive text-primary-foreground rounded-full font-semibold hover:bg-destructive/90 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCards;
