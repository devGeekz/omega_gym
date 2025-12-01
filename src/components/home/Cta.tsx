import Link from "next/link";

export default function Cta() {
  return (
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
  );
}
