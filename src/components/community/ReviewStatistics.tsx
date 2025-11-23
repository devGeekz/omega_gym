// components/ReviewStatistics.tsx
import { motion } from 'framer-motion';

interface StatCardProps {
  number: string;
  label: string;
  showStars?: boolean;
}

const StatCard = ({ number, label, showStars = false }: StatCardProps) => (
  <div className="bg-white rounded-xl p-8 text-center shadow-lg h-full flex flex-col justify-between">
    <div>
      <div className="text-3xl md:text-4xl font-extrabold mb-2 dark:text-black">
        {number}
      </div>
      {showStars && (
        <div className="text-2xl mb-2 text-yellow-500 dark:text-yellow-500">★★★★★</div>
      )}
    </div>
    <div>
      <div className="font-medium dark:text-black">
        {label}
      </div>
    </div>
  </div>
);

const ReviewStatistics = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Animates children one after another
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={itemVariants}><StatCard number="4.8" label="Overall Rating" showStars={true} /></motion.div>
          <motion.div variants={itemVariants}><StatCard number="2,847" label="Reviews" /></motion.div>
          <motion.div variants={itemVariants}><StatCard number="1,293" label="Success Stories" /></motion.div>
          <motion.div variants={itemVariants}><StatCard number="98%" label="Satisfaction Rate" /></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewStatistics;