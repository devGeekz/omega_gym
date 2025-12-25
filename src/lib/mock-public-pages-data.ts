// ============================================================================
// MOCK DATA FOR PUBLIC PAGES
// ============================================================================
// Complete mock data for: Community, Articles, Schedules, and Membership

import {
  CommunityReview,
  SuccessStory,
  PhotoGalleryImage,
  Article,
  MembershipPlan,
  MembershipFAQ,
} from "@/types/public-pages";
import { ScheduleClass } from "@/types/schedules";

/**
 * COMMUNITY PAGE MOCK DATA
 */

export const mockCommunityReviews: CommunityReview[] = [
  {
    id: "rev-001",
    memberId: "mem-001",
    memberName: "Sarah Johnson",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    membershipPlan: "Pro Annual",
    rating: 5,
    title: "Transformed My Life!",
    review:
      "The trainers here are absolutely amazing! They created a personalized plan that fits my schedule and goals. I've lost 15kg in 4 months and feel stronger than ever.",
    createdAt: "2024-12-10T14:30:00Z",
    helpful: 234,
    images: ["https://via.placeholder.com/300x300?text=Before+After"],
  },
  {
    id: "rev-002",
    memberId: "mem-002",
    memberName: "Marcus Williams",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    membershipPlan: "Elite",
    rating: 5,
    title: "Best Investment in Myself",
    review:
      "The facilities are top-notch and the community is incredibly supportive. Been a member for 2 years and never looked back. Highly recommend!",
    createdAt: "2024-12-08T10:15:00Z",
    helpful: 189,
  },
  {
    id: "rev-003",
    memberId: "mem-003",
    memberName: "Emma Chen",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    membershipPlan: "Pro Monthly",
    rating: 4,
    title: "Great Classes, Good Community",
    review:
      "Love the variety of classes available. The yoga and pilates sessions are particularly well-structured. Would appreciate more evening classes.",
    createdAt: "2024-12-05T16:45:00Z",
    helpful: 156,
  },
  {
    id: "rev-004",
    memberId: "mem-004",
    memberName: "David Brown",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    membershipPlan: "Basic",
    rating: 4,
    title: "Good Value for Money",
    review:
      "For the price, this gym offers excellent equipment and atmosphere. The only drawback is limited personal training included in basic plan.",
    createdAt: "2024-12-02T09:20:00Z",
    helpful: 142,
  },
  {
    id: "rev-005",
    memberId: "mem-005",
    memberName: "Lisa Rodriguez",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    membershipPlan: "Elite",
    rating: 5,
    title: "Community Feels Like Family",
    review:
      "This gym isn't just about equipment—it's about the people. Everyone motivates each other. The success challenges really bring everyone together!",
    createdAt: "2024-11-28T13:55:00Z",
    helpful: 198,
  },
];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: "story-001",
    memberId: "mem-001",
    memberName: "Sarah Johnson",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    startDate: "2024-08-15",
    endDate: "2024-12-15",
    beforeImage: "https://api.placeholder.com/500x500?text=Before",
    afterImage: "https://api.placeholder.com/500x500?text=After",
    goal: "Lose weight and build confidence",
    story:
      "Started at 95kg with low confidence. Committed to 5 days/week training combining cardio and strength. Also adjusted diet with help from our nutrition coaches. The supportive community made all the difference—everyone celebrated my milestones!",
    results: [
      "Lost 15kg",
      "Increased strength by 40%",
      "Completed first 5K run",
      "Improved sleep quality",
      "Gained confidence",
    ],
    weight: { before: 95, after: 80 },
    metrics: [
      { label: "Body Fat %", before: "35%", after: "24%" },
      { label: "Bench Press", before: "40kg", after: "65kg" },
      { label: "Squat", before: "60kg", after: "100kg" },
      { label: "Energy Level", before: "Low", after: "Excellent" },
    ],
    views: 1523,
    shares: 234,
  },
  {
    id: "story-002",
    memberId: "mem-006",
    memberName: "James Miller",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    startDate: "2024-07-01",
    endDate: "2024-12-01",
    beforeImage: "https://api.placeholder.com/500x500?text=Before",
    afterImage: "https://api.placeholder.com/500x500?text=After",
    goal: "Build muscle and strength",
    story:
      "As a programmer, I was spending 8+ hours daily at desk. Started training with focus on compound movements. Worked with personalized trainer who educated me on proper form and progressive overload.",
    results: [
      "Gained 8kg of muscle",
      "Increased bench by 50kg",
      "Better posture and less back pain",
      "More energy during work",
      "Improved focus and productivity",
    ],
    weight: { before: 75, after: 83 },
    metrics: [
      { label: "Bench Press", before: "50kg", after: "100kg" },
      { label: "Deadlift", before: "80kg", after: "150kg" },
      { label: "Body Fat %", before: "22%", after: "18%" },
      { label: "Muscle Mass", before: "40%", after: "48%" },
    ],
    views: 987,
    shares: 145,
  },
  {
    id: "story-003",
    memberId: "mem-007",
    memberName: "Michelle Garcia",
    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michelle",
    startDate: "2024-09-01",
    endDate: "2024-12-01",
    beforeImage: "https://api.placeholder.com/500x500?text=Before",
    afterImage: "https://api.placeholder.com/500x500?text=After",
    goal: "Improve flexibility and overall wellness",
    story:
      "Never thought I could do yoga or pilates. Tried it at the gym and fell in love. Combined yoga, pilates, and light cardio. Found my zen and flexibility improved dramatically.",
    results: [
      "Can touch toes (couldn't before!)",
      "Reduced stress and anxiety",
      "Better sleep",
      "Improved balance",
      "Pain-free after years of back issues",
    ],
    metrics: [
      { label: "Flexibility", before: "Poor", after: "Excellent" },
      { label: "Stress Level", before: "High", after: "Low" },
      { label: "Sleep Quality", before: "6hrs", after: "8hrs" },
      { label: "Chronic Pain", before: "Severe", after: "None" },
    ],
    views: 1205,
    shares: 187,
  },
];

export const mockGalleryImages: PhotoGalleryImage[] = [
  {
    id: "img-001",
    url: "https://api.placeholder.com/400x400?text=Gym+Event",
    caption: "Annual Fitness Challenge 2024",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-10T10:00:00Z",
    category: "events",
    likes: 156,
  },
  {
    id: "img-002",
    url: "https://api.placeholder.com/400x400?text=Member+Photo",
    caption: "Sarah's 15kg loss celebration!",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-12-08T14:30:00Z",
    category: "members",
    likes: 234,
  },
  {
    id: "img-003",
    url: "https://api.placeholder.com/400x400?text=Gym+Facility",
    caption: "New equipment arrived",
    uploadedBy: "Admin",
    uploadedAt: "2024-12-05T09:15:00Z",
    category: "gym",
    likes: 89,
  },
  {
    id: "img-004",
    url: "https://api.placeholder.com/400x400?text=Challenge",
    caption: "Summer Challenge Winners",
    uploadedBy: "Admin",
    uploadedAt: "2024-11-20T16:45:00Z",
    category: "challenges",
    likes: 201,
  },
  {
    id: "img-005",
    url: "https://api.placeholder.com/400x400?text=Group+Class",
    caption: "HIIT class action shot",
    uploadedBy: "Trainer Mike",
    uploadedAt: "2024-11-15T18:00:00Z",
    category: "events",
    likes: 167,
  },
  {
    id: "img-006",
    url: "https://api.placeholder.com/400x400?text=Transformation",
    caption: "James' muscle gain journey",
    uploadedBy: "James Miller",
    uploadedAt: "2024-11-10T11:30:00Z",
    category: "members",
    likes: 245,
  },
];

/**
 * ARTICLE PAGE MOCK DATA
 */

export const mockArticles: Article[] = [
  {
    id: "art-001",
    slug: "beginner-strength-training-guide",
    title: "Beginner's Guide to Strength Training",
    excerpt:
      "Start your strength training journey with this comprehensive guide covering fundamentals, safety, and progressive overload.",
    content: `# Beginner's Guide to Strength Training

Strength training is one of the most effective ways to build a healthier, stronger body. Whether you're just starting out or returning after a break, this guide will help you understand the fundamentals.

## Why Strength Training?

Strength training offers numerous benefits:
- Builds muscle mass and bone density
- Increases metabolism
- Improves posture and reduces injury risk
- Enhances mental health and confidence
- Increases functional strength for daily activities

## Key Principles

### Progressive Overload
Gradually increase the weight, reps, or sets to continue challenging your muscles.

### Proper Form
Never sacrifice form for weight. Perfect technique prevents injuries and maximizes gains.

### Consistency
Train 3-4 times per week with at least one rest day between sessions.

### Recovery
Sleep 7-9 hours nightly and fuel your body with adequate protein.

## Getting Started

1. Choose compound exercises (squats, deadlifts, bench press, rows)
2. Start with lighter weights to master form
3. Follow a structured program (3 days/week is ideal)
4. Track your workouts
5. Don't compare your beginning to someone else's middle

Remember, everyone starts somewhere. Focus on progress, not perfection.`,
    author: {
      id: "auth-001",
      name: "Coach Michael",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "Certified strength and conditioning coach with 10+ years experience",
    },
    category: "training",
    thumbnail: "https://api.placeholder.com/800x400?text=Strength+Training",
    images: [
      "https://api.placeholder.com/800x400?text=Gym+Setup",
      "https://api.placeholder.com/800x400?text=Form+Tips",
    ],
    publishedAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-10T10:00:00Z",
    readTime: 8,
    views: 2345,
    likes: 567,
    tags: ["fitness", "strength", "beginner", "training"],
    comments: [
      {
        id: "com-001",
        authorId: "mem-001",
        authorName: "Sarah Johnson",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content:
          "This guide really helped me start my fitness journey. Clear and actionable!",
        createdAt: "2024-12-10T14:30:00Z",
        likes: 45,
      },
    ],
  },
  {
    id: "art-002",
    slug: "nutrition-post-workout-recovery",
    title: "Nutrition for Post-Workout Recovery",
    excerpt:
      "Learn what to eat after your workouts to maximize recovery and muscle growth.",
    content: `# Nutrition for Post-Workout Recovery

What you eat after your workout is just as important as the workout itself. Here's what science says about post-workout nutrition.

## The Anabolic Window

After training, your muscles are primed to accept nutrients. The first 1-2 hours is optimal.

## Key Nutrients

### Protein
- Aim for 20-40g of protein post-workout
- Helps repair and build muscle tissue
- Examples: chicken, fish, eggs, protein powder

### Carbohydrates
- Replenish glycogen stores
- Support recovery and energy
- Choose whole grains and fruits

### Healthy Fats
- Support hormone production
- Aid nutrient absorption
- Include nuts, avocado, olive oil

## Sample Post-Workout Meals

- Grilled chicken with sweet potato and broccoli
- Greek yogurt with berries and granola
- Protein smoothie with banana and peanut butter
- Salmon with rice and asparagus`,
    author: {
      id: "auth-002",
      name: "Nutritionist Emma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bio: "Certified nutritionist specializing in sports nutrition",
    },
    category: "nutrition",
    thumbnail: "https://api.placeholder.com/800x400?text=Nutrition",
    images: ["https://api.placeholder.com/800x400?text=Healthy+Food"],
    publishedAt: "2024-12-05T09:00:00Z",
    updatedAt: "2024-12-05T09:00:00Z",
    readTime: 6,
    views: 1876,
    likes: 423,
    tags: ["nutrition", "recovery", "post-workout", "diet"],
    comments: [],
  },
  {
    id: "art-003",
    slug: "yoga-benefits-stress-relief",
    title: "Yoga and Its Mental Health Benefits",
    excerpt:
      "Discover how yoga can transform your mental wellness and reduce stress.",
    content: `# The Power of Yoga for Mental Wellness

Yoga isn't just physical—it's a powerful tool for mental health and stress management.

## Mental Benefits of Regular Yoga

### Stress Reduction
Yoga lowers cortisol levels and activates the parasympathetic nervous system.

### Improved Focus
Mindfulness practices enhance concentration and mental clarity.

### Better Sleep
Gentle yoga before bed promotes deeper, more restorative sleep.

### Emotional Balance
Regular practice helps manage anxiety and depression symptoms.

## Getting Started with Yoga

1. Choose a beginner-friendly class
2. Focus on your breathing
3. Never push into pain
4. Practice consistently (3-4 times weekly)
5. Be patient with yourself`,
    author: {
      id: "auth-003",
      name: "Yoga Instructor Lisa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      bio: "Certified yoga instructor with mindfulness training",
    },
    category: "wellness",
    thumbnail: "https://api.placeholder.com/800x400?text=Yoga",
    images: ["https://api.placeholder.com/800x400?text=Yoga+Pose"],
    publishedAt: "2024-12-01T14:00:00Z",
    updatedAt: "2024-12-01T14:00:00Z",
    readTime: 7,
    views: 3421,
    likes: 892,
    tags: ["yoga", "mental-health", "wellness", "stress-relief"],
    comments: [],
  },
  {
    id: "art-004",
    slug: "hiit-workouts-efficiency",
    title: "Why HIIT is the Most Efficient Workout",
    excerpt:
      "High-Intensity Interval Training delivers maximum results in minimum time.",
    content: `# The Science Behind HIIT

HIIT (High-Intensity Interval Training) is a time-efficient training method that delivers incredible results.

## How HIIT Works

Alternating between intense effort and recovery periods creates an "afterburn effect."

## Benefits

- Time efficient (30 minutes = 1 hour of steady cardio)
- Boosts metabolism for hours post-workout
- Improves cardiovascular health
- Preserves muscle mass
- Can be done anywhere

## Sample HIIT Workout

30 seconds max effort, 30 seconds recovery:
- Burpees
- Mountain climbers
- Jump squats
- High knees

Repeat 4 rounds. Total time: 16 minutes.`,
    author: {
      id: "auth-001",
      name: "Coach Michael",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "Certified strength and conditioning coach with 10+ years experience",
    },
    category: "training",
    thumbnail: "https://api.placeholder.com/800x400?text=HIIT",
    images: ["https://api.placeholder.com/800x400?text=HIIT+Workout"],
    publishedAt: "2024-11-28T11:00:00Z",
    updatedAt: "2024-11-28T11:00:00Z",
    readTime: 5,
    views: 2156,
    likes: 634,
    tags: ["hiit", "cardio", "training", "efficiency"],
    comments: [],
  },
];

/**
 * SCHEDULE PAGE MOCK DATA
 */

export const mockScheduleClasses: ScheduleClass[] = [
  {
    id: "class-001",
    name: "Morning HIIT",
    description:
      "High-intensity interval training for maximum calorie burn and cardiovascular fitness.",
    trainer: {
      id: "trainer-001",
      name: "Coach Mike",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    day: "Monday",
    date: "2024-12-16",
    startTime: "06:00",
    endTime: "07:00",
    duration: 60,
    capacity: 20,
    enrolled: 18,
    level: "intermediate",
    type: "hiit",
    location: "Main Gym",
    room: "Studio A",
    isFull: false,
    status: "upcoming",
    price: 0,
    requirements: ["Good cardiovascular fitness"],
    image: "https://api.placeholder.com/300x200?text=HIIT",
  },
  {
    id: "class-002",
    name: "Strength & Power",
    description:
      "Build muscle and strength with compound exercises and progressive overload.",
    trainer: {
      id: "trainer-002",
      name: "Coach Sarah",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    day: "Monday",
    date: "2024-12-16",
    startTime: "07:30",
    endTime: "08:30",
    duration: 60,
    capacity: 15,
    enrolled: 12,
    level: "advanced",
    type: "strength",
    location: "Main Gym",
    room: "Free Weights Area",
    isFull: false,
    status: "upcoming",
    price: 0,
    requirements: ["Basic lifting experience"],
    image: "https://api.placeholder.com/300x200?text=Strength",
  },
  {
    id: "class-003",
    name: "Yoga Flow",
    description:
      "Balanced yoga session focusing on flexibility, strength, and mindfulness.",
    trainer: {
      id: "trainer-003",
      name: "Instructor Lisa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
    day: "Monday",
    date: "2024-12-16",
    startTime: "09:00",
    endTime: "10:00",
    duration: 60,
    capacity: 25,
    enrolled: 22,
    level: "beginner",
    type: "flexibility",
    location: "Main Gym",
    room: "Yoga Studio",
    isFull: false,
    status: "upcoming",
    price: 0,
    requirements: [],
    image: "https://api.placeholder.com/300x200?text=Yoga",
  },
  {
    id: "class-004",
    name: "Boxing Bootcamp",
    description:
      "Learn boxing fundamentals while getting an intense cardio workout.",
    trainer: {
      id: "trainer-004",
      name: "Coach James",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    day: "Tuesday",
    date: "2024-12-17",
    startTime: "17:00",
    endTime: "18:00",
    duration: 60,
    capacity: 20,
    enrolled: 20,
    level: "intermediate",
    type: "boxing",
    location: "Main Gym",
    room: "Ring Area",
    isFull: true,
    status: "upcoming",
    price: 0,
    requirements: ["Hand wraps and gloves"],
    image: "https://api.placeholder.com/300x200?text=Boxing",
  },
  {
    id: "class-005",
    name: "Pilates Core",
    description:
      "Focused pilates session to strengthen your core and improve posture.",
    trainer: {
      id: "trainer-005",
      name: "Instructor Emma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    day: "Tuesday",
    date: "2024-12-17",
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    capacity: 18,
    enrolled: 14,
    level: "intermediate",
    type: "pilates",
    location: "Main Gym",
    room: "Studio B",
    isFull: false,
    status: "upcoming",
    price: 0,
    requirements: [],
    image: "https://api.placeholder.com/300x200?text=Pilates",
  },
  {
    id: "class-006",
    name: "CrossFit WOD",
    description:
      "Functional fitness workout of the day. Scalable for all levels.",
    trainer: {
      id: "trainer-006",
      name: "Coach David",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    day: "Wednesday",
    date: "2024-12-18",
    startTime: "17:30",
    endTime: "18:30",
    duration: 60,
    capacity: 16,
    enrolled: 15,
    level: "advanced",
    type: "crossfit",
    location: "Main Gym",
    room: "CrossFit Box",
    isFull: false,
    status: "upcoming",
    price: 0,
    requirements: ["CrossFit Level 1 or equivalent"],
    image: "https://api.placeholder.com/300x200?text=CrossFit",
  },
];

/**
 * MEMBERSHIP PLANS MOCK DATA
 */

export const mockMembershipPlans: MembershipPlan[] = [
  {
    id: "plan-001",
    name: "Basic",
    planType: "basic",
    description: "Perfect for beginners to explore fitness",
    price: 29.99,
    billingCycle: "monthly",
    duration: 1,
    features: [
      {
        id: "feat-001",
        name: "24/7 Gym Access",
        included: true,
        limit: "Unlimited",
      },
      {
        id: "feat-002",
        name: "Group Classes",
        included: true,
        limit: "Standard classes only",
      },
      {
        id: "feat-003",
        name: "Personal Training",
        included: false,
      },
      {
        id: "feat-004",
        name: "Nutrition Coaching",
        included: false,
      },
      {
        id: "feat-005",
        name: "Premium Equipment",
        included: false,
      },
      {
        id: "feat-006",
        name: "Guest Passes",
        included: true,
        limit: "2 per month",
      },
    ],
    limitations: [
      {
        id: "lim-001",
        name: "Peak Hours",
        limit: "Busy during 6-9 AM and 5-8 PM",
        category: "access",
      },
      {
        id: "lim-002",
        name: "Personal Training Sessions",
        limit: "Available at additional cost",
        category: "coaching",
      },
    ],
    color: "from-blue-500 to-blue-600",
    icon: "Zap",
    popular: false,
  },
  {
    id: "plan-002",
    name: "Pro",
    planType: "pro",
    description: "For serious fitness enthusiasts",
    price: 59.99,
    billingCycle: "monthly",
    duration: 1,
    features: [
      {
        id: "feat-001",
        name: "24/7 Gym Access",
        included: true,
        limit: "Unlimited",
      },
      {
        id: "feat-002",
        name: "Group Classes",
        included: true,
        limit: "All classes + premium",
      },
      {
        id: "feat-003",
        name: "Personal Training",
        included: true,
        limit: "4 sessions/month",
      },
      {
        id: "feat-004",
        name: "Nutrition Coaching",
        included: true,
        limit: "Bi-weekly consultations",
      },
      {
        id: "feat-005",
        name: "Premium Equipment",
        included: true,
      },
      {
        id: "feat-006",
        name: "Guest Passes",
        included: true,
        limit: "Unlimited",
      },
    ],
    limitations: [],
    color: "from-purple-500 to-purple-600",
    icon: "Flame",
    popular: true,
    savings: 17,
  },
  {
    id: "plan-003",
    name: "Elite",
    planType: "elite",
    description: "Our premium membership with VIP benefits",
    price: 99.99,
    billingCycle: "monthly",
    duration: 1,
    features: [
      {
        id: "feat-001",
        name: "24/7 Gym Access",
        included: true,
        limit: "Unlimited + priority access",
      },
      {
        id: "feat-002",
        name: "Group Classes",
        included: true,
        limit: "All classes + exclusive",
      },
      {
        id: "feat-003",
        name: "Personal Training",
        included: true,
        limit: "12 sessions/month",
      },
      {
        id: "feat-004",
        name: "Nutrition Coaching",
        included: true,
        limit: "Weekly consultations + meal plans",
      },
      {
        id: "feat-005",
        name: "Premium Equipment",
        included: true,
        limit: "Reserved time slots",
      },
      {
        id: "feat-006",
        name: "Guest Passes",
        included: true,
        limit: "Unlimited",
      },
      {
        id: "feat-007",
        name: "VIP Lounge Access",
        included: true,
        limit: "Lounge + spa area",
      },
      {
        id: "feat-008",
        name: "Priority Support",
        included: true,
        limit: "24/7 phone + email",
      },
    ],
    limitations: [],
    color: "from-amber-500 to-amber-600",
    icon: "Crown",
    popular: false,
    savings: 25,
  },
];

export const mockMembershipFAQs: MembershipFAQ[] = [
  {
    id: "faq-001",
    question: "Can I cancel my membership anytime?",
    answer:
      "Yes, you can cancel anytime with 30 days notice. No hidden fees or long-term contracts.",
    category: "cancellation",
  },
  {
    id: "faq-002",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and bank transfers.",
    category: "billing",
  },
  {
    id: "faq-003",
    question: "Is there a sign-up fee?",
    answer: "No sign-up fees! Just membership dues each month.",
    category: "billing",
  },
  {
    id: "faq-004",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely! You can change your plan any time. Adjustments are prorated.",
    category: "features",
  },
  {
    id: "faq-005",
    question: "Do members get discounts on personal training?",
    answer:
      "Yes! Pro and Elite members get 4-12 included sessions per month. Additional sessions available at a discount.",
    category: "features",
  },
  {
    id: "faq-006",
    question: "Is there a trial period?",
    answer: "Yes, we offer a 7-day free trial so you can experience the gym.",
    category: "general",
  },
];
