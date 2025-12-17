export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  tags: string[];
  uploadedBy: string;
  viewCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type GalleryCategory = "Class" | "Event" | "Members" | "Transformation" | "Equipment";
export type GallerySortBy = "Recent" | "Popular" | "Featured" | "Oldest";

export const GALLERY_CATEGORIES: GalleryCategory[] = ["Class", "Event", "Members", "Transformation", "Equipment"];
export const SORT_OPTIONS: GallerySortBy[] = ["Recent", "Popular", "Featured", "Oldest"];

export const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  Class: "from-blue-500 to-blue-600",
  Event: "from-purple-500 to-purple-600",
  Members: "from-green-500 to-green-600",
  Transformation: "from-orange-500 to-orange-600",
  Equipment: "from-red-500 to-red-600",
};

export const CATEGORY_ICONS: Record<GalleryCategory, string> = {
  Class: "📚",
  Event: "🎉",
  Members: "👥",
  Transformation: "💪",
  Equipment: "🏋️",
};

// Mock gallery data
export const MOCK_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    title: "Morning Yoga Class",
    description: "Energizing morning yoga session with our certified instructors",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop",
    category: "Class",
    tags: ["yoga", "morning", "flexibility"],
    uploadedBy: "Sarah",
    viewCount: 2450,
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2025-12-10"),
    updatedAt: new Date("2025-12-15"),
  },
  {
    id: "2",
    title: "New Year Gala 2025",
    description: "Grand opening event of our new fitness center",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=500&fit=crop",
    category: "Event",
    tags: ["event", "celebration", "new-year"],
    uploadedBy: "Mike",
    viewCount: 3120,
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-12-14"),
  },
  {
    id: "3",
    title: "Member Success Story",
    description: "John's transformation journey - 6 months of dedication",
    imageUrl: "https://images.unsplash.com/photo-1578762335591-ce4a42ce0d55?w=500&h=500&fit=crop",
    category: "Transformation",
    tags: ["transformation", "success", "motivation"],
    uploadedBy: "Coach Alex",
    viewCount: 5890,
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-12-13"),
  },
  {
    id: "4",
    title: "Team Gym Photo",
    description: "Our amazing team members working hard at the gym",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop",
    category: "Members",
    tags: ["team", "motivation", "members"],
    uploadedBy: "Admin",
    viewCount: 1230,
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-12-05"),
    updatedAt: new Date("2025-12-12"),
  },
  {
    id: "5",
    title: "State-of-the-art Equipment",
    description: "Our newly installed premium fitness equipment",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop",
    category: "Equipment",
    tags: ["equipment", "premium", "facilities"],
    uploadedBy: "Manager",
    viewCount: 2100,
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-12-01"),
    updatedAt: new Date("2025-12-10"),
  },
  {
    id: "6",
    title: "High-Intensity Training",
    description: "HIIT training session with maximum intensity",
    imageUrl: "https://images.unsplash.com/photo-1549576528-b0fffc53cfca?w=500&h=500&fit=crop",
    category: "Class",
    tags: ["hiit", "training", "intense"],
    uploadedBy: "Coach Maria",
    viewCount: 4210,
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-11-20"),
    updatedAt: new Date("2025-12-08"),
  },
];
