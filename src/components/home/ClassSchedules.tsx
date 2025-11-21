"use client";
import { useMemo, useState } from "react";
import { allClasses } from "./Constants";

const ClassSchdules = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookedClasses, setBookedClasses] = useState(new Set());

  const filteredClasses = useMemo(() => {
    if (activeFilter === "all") return allClasses;
    return allClasses.filter((cls) => cls.category === activeFilter);
  }, [activeFilter]);

  const toggleBookClass = (classId: number) => {
    setBookedClasses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(classId)) {
        newSet.delete(classId);
      } else {
        newSet.add(classId);
      }
      return newSet;
    });
  };
  return (
    <section id="classes" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 animate-on-scrolls">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-secondary-foreground">
            Group Classes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert-led classes designed to motivate, challenge, and transform
            your fitness journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scrolls">
          {["all", "hiit", "yoga", "strength", "cardio"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-semibold uppercase text-sm transition-all ${
                activeFilter === filter
                  ? "bg-destructive text-primary-foreground"
                  : "border-2 border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all animate-on-scrolls"
            >
              <div className="text-2xl font-bold text-destructive mb-2">
                {cls.time}
              </div>
              <h4 className="text-xl font-bold uppercase mb-2 text-card-foreground">
                {cls.name}
              </h4>
              <p className="text-muted-foreground mb-1">
                with {cls.instructor}
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                {cls.spots} spots available
              </p>
              <button
                onClick={() => toggleBookClass(cls.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  bookedClasses.has(cls.id)
                    ? "bg-destructive text-primary-foreground cursor-not-allowed"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:-translate-y-1"
                }`}
              >
                {bookedClasses.has(cls.id) ? "✓ Booked" : "Book Class"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchdules;
