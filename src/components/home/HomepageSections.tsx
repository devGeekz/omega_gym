import Link from "next/link";
import { Equipments, Testimonials } from "./Constants";
import Memberships from "./MembershipCards";
import ClassSchdules from "./ClassSchedules";

export function HomePageSections() {
  return (
    <div className="mt-20 space-y-20">
      {/* Equipment Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-foreground">
              Premium Equipment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art fitness equipment designed to help you achieve
              your goals faster and safer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Equipments.map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 bg-linear-to-br from-primary to-muted-foreground/50 flex items-center justify-center">
                  <div className="text-6xl">🏋️</div>
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

      {/* Class Schedule */}
      <ClassSchdules />

      {/* Membership Plans */}
      <Memberships />
      {/* Testimonials */}
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
      {/* CTA Section */}
      <section className="py-20 bg-primary dark:bg-background/40 text-primary-foreground dark:text-muted-foreground">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Ready to Transform?
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have already started their fitness
            journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="px-8 py-4 bg-destructive text-primary-foreground rounded-full font-semibold hover:bg-destructive/90 transition-all"
            >
              Get Started Today
            </Link>
            <Link
              href="/community"
              className="px-8 py-4 border-2 border-primary-foreground dark:border-muted-foreground/70 text-primary-foreground dark:text-muted-foreground rounded-full font-semibold hover:bg-primary-foreground hover:text-primary transition-all"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
