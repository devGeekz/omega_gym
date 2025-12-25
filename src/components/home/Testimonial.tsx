import { Testimonials } from "./Constants";

const Testimonial = () => {
  return (
    <section className="py-20 md:py-24 bg-linear-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in duration-500">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Real transformations from real people in our fitness community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group animate-in fade-in duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-border/50 transition-all duration-300 h-full flex flex-col hover:border-primary/30 hover:bg-linear-to-br hover:from-card hover:to-primary/5">
                {/* Avatar */}
                <div className="w-20 h-20 bg-linear-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  👤
                </div>

                {/* Stars */}
                <div className="text-xl mb-4 tracking-widest group-hover:scale-110 transition-transform">
                  ★★★★★
                </div>

                {/* Testimonial Text */}
                <p className="italic text-muted-foreground mb-6 flex-1 leading-relaxed text-sm md:text-base">
                  "{testimonial.text}"
                </p>

                {/* Author Name */}
                <p className="font-bold text-card-foreground text-lg group-hover:text-primary transition-colors">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
