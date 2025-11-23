import Image from 'next/image';

const PhotoGallery = () => {
  const images = [
    { src: "/resources/class-group.jpg", alt: "Group Class" },
    { src: "/resources/equipment-1.jpg", alt: "Equipment" },
    { src: "/resources/gym-interior.jpg", alt: "Gym Interior" },
    { src: "/resources/hero-gym.jpg", alt: "Fitness Journey" },
    { src: "/resources/member-1.jpg", alt: "Member Success" },
    { src: "/resources/trainer-session.jpg", alt: "Personal Training" }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold uppercase text-[var(--primary-dark)] mb-2">
            Community Gallery
          </h2>
          <p className="text-lg text-[var(--gray-dark)] max-w-2xl mx-auto">
            Moments from our fitness community - workouts, events, and celebrations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-4xl text-white">📸</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;