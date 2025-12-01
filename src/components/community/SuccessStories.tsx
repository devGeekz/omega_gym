import Image from 'next/image';

interface Stat {
  value: string;
  label: string;
}

interface Story {
  title: string;
  description: string;
  image: string;
  stats: Stat[];
}

const SuccessStories = () => {
  const stories: Story[] = [
    {
      title: "Sarah's Journey",
      description: "Lost 40 pounds and gained incredible strength. The community support kept me motivated every step of the way!",
      image: "/images/pose.jpg",
      stats: [
        { value: "40 lbs", label: "Weight Lost" },
        { value: "6 months", label: "Timeframe" },
        { value: "5x", label: "Strength Gain" }
      ]
    },
    {
      title: "Mike's Transformation",
      description: "From couch potato to marathon runner. The trainers here believed in me when I didn't believe in myself.",
      image: "/images/girlwithglove.jpg",
      stats: [
        { value: "26.2 mi", label: "Marathon" },
        { value: "8 months", label: "Training" },
        { value: "3:45", label: "Finish Time" }
      ]
    },
    {
      title: "Emma's Strength",
      description: "At 45, I'm stronger than I was in my twenties. The personal training program completely changed my life.",
      image: "/images/trainer2.jpg",
      stats: [
        { value: "200 lbs", label: "Deadlift" },
        { value: "12 months", label: "Training" },
        { value: "-15%", label: "Body Fat" }
      ]
    }
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold uppercase dark:text-white mb-2">
            Success Stories
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Incredible transformations from our amazing community members.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:transform hover:-translate-y-3 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover grayscale-75"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-black mb-3">{story.title}</h3>
                <p className="dark:text-black] mb-4">{story.description}</p>
                
                <div className="flex justify-between mb-4">
                  {story.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl font-extrabold text-green-500 ">{stat.value}</div>
                      <div className="text-xs dark:text-black font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-3 bg-gray-400 text-white font-semibold rounded-full hover:bg-[#1bb010] transition-colors">
                  Read Full Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;