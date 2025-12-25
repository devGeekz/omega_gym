import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-primary/80 opacity-95" />
          <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-background/20" />
          
          {/* Content */}
          <div className="relative p-12 md:p-16 text-center animate-in fade-in duration-500">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 text-white">
              Ready to Transform?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of members who have already started their fitness journey with us. Your transformation begins today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-500 delay-200">
              <Link
                href="/membership"
                className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
              >
                Get Started Today
              </Link>
              <Link
                href="/community"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
              >
                Join Community
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="text-xl">✓</span>
                <span>100% Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✓</span>
                <span>No Long-Term Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
