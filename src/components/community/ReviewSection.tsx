import { useState } from 'react';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const ReviewsSection = () => {
  const [reviews] = useState<Review[]>([
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing gym with fantastic trainers! The community here is so supportive and motivating. I\'ve achieved results I never thought possible.',
      date: '2024-01-15',
      helpful: 23
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Best fitness decision I\'ve ever made. The equipment is top-notch and the classes are incredible. Highly recommend!',
      date: '2024-01-10',
      helpful: 18
    },
    {
      name: 'Emma Davis',
      rating: 4,
      comment: 'Great facility with excellent trainers. The only reason I\'m giving 4 stars is because it can get crowded during peak hours.',
      date: '2024-01-08',
      helpful: 12
    },
    {
      name: 'John Smith',
      rating: 5,
      comment: 'Transformed my life! Lost 30 pounds and gained so much confidence. The personal training sessions are worth every penny.',
      date: '2024-01-05',
      helpful: 31
    },
    {
      name: 'Lisa Rodriguez',
      rating: 5,
      comment: 'Love the variety of classes and the supportive community. The yoga sessions are my favorite!',
      date: '2024-01-03',
      helpful: 15
    },
    {
      name: 'David Wilson',
      rating: 4,
      comment: 'Clean facility, professional staff, and great equipment. The nutrition coaching was a game-changer for me.',
      date: '2024-01-01',
      helpful: 8
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredReviews(reviews);
    } else if (filter === 'recent') {
      setFilteredReviews([...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } else {
      const rating = parseInt(filter);
      setFilteredReviews(reviews.filter(review => review.rating === rating));
    }
  };

  const renderStars = (rating: number) => (
    <div className="text-amber-300 font-bold">
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </div>
  );

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold uppercase text-[var(--primary-dark)] mb-2">
            Member Reviews
          </h2>
          <p className="text-lg dark:text-black max-w-2xl mx-auto">
            Real reviews from real members of the OMEGA community.
          </p>
        </div>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['all', '5', '4', '3', 'recent'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`py-3 px-6 border-2 rounded-full font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-amtext-amber-300 text-black dark:text-white border-amtext-amber-300'
                  : 'border-amtext-amber-300 text-amber-300 hover:bg-amtext-amber-300 hover:text-gray-400'
              }`}
            >
              {filter === 'all' ? 'All Reviews' : 
               filter === 'recent' ? 'Recent' : 
               `${filter} Stars`}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold dark:text-black">{review.name}</h4>
                {renderStars(review.rating)}
              </div>
              
              <p className="dark:text-black mb-4 leading-relaxed">{review.comment}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-[var(--gray-light)]">
                <span className="text-sm dark:text-black">{review.date}</span>
                <button className="border border-black dark:text-black px-4 py-2 rounded-full text-sm hover:bg-[var(--sage)] hover:text-gray-400 transition-colors">
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;