import { Testimonials } from "./Constants";

const Testimonial = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-secondary-foreground">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real transformations from real people in our fitness community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl p-8 text-center shadow-xl"
            >
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <div className="text-2xl text-destructive mb-4">★★★★★</div>
              <p className="italic text-muted-foreground mb-4">
                `&rdquo`{testimonial.text}`&quot`
              </p>
              <p className="font-semibold text-card-foreground">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
