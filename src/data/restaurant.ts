// Static restaurant data used across the site: business details, menus, and content.
export const business = {
  name: "Plaza Mexico",
  tagline: "Authentic Mexican Cuisine in New Haven",
  address: "549 Ferry St, New Haven, CT 06513",
  phone: "(203) 777-0198",
  phoneHref: "+12037770198",
  email: "hello@plazamexiconewhaven.com",
  cateringEmail: "catering@plazamexiconewhaven.com",
  website: "https://plazamexiconewhaven.com",
};

export const taxRate = 0.0635;

// Online ordering settings used by the order modal.
export const ordering = {
  deliveryFee: 4.99,
  freeDeliveryThreshold: 40,
  deliveryMinimum: 15,
  pickupEstimate: "20–30 min",
  deliveryEstimate: "40–55 min",
  // Earliest lead time (in minutes) before a scheduled order can be ready.
  minLeadTimeMinutes: 30,
};

export const navigation = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Catering", path: "/catering" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export const hero = {
  title: "Authentic Mexican Cuisine",
  subtitle: "Fresh ingredients, traditional recipes, unforgettable flavors.",
  primaryCTA: "Order Now",
  secondaryCTA: "View Menu",
};

export const features = [
  {
    title: "Fresh Ingredients",
    description: "Locally sourced vegetables and premium meats.",
    icon: "Leaf" as const,
  },
  {
    title: "Authentic Recipes",
    description: "Traditional Mexican cooking techniques.",
    icon: "Flame" as const,
  },
  {
    title: "Family Friendly",
    description: "Perfect atmosphere for family dining.",
    icon: "Users" as const,
  },
];

export const menuCategories = [
  "Antojitos",
  "Burritos",
  "Desserts",
  "Drinks",
  "Enchiladas",
  "Pozole",
  "Quesadillas",
  "Sopes",
  "Tacos",
  "Tamales",
  "Tostadas",
];

export type DietaryTag = "Vegetarian" | "Vegan" | "Spicy" | "Gluten-Free";

// Dietary tags surfaced as menu badges and as an extra filter group.
export const dietaryOptions: DietaryTag[] = [
  "Vegetarian",
  "Vegan",
  "Spicy",
  "Gluten-Free",
];

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: DietaryTag[];
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Chicken Tacos",
    description: "Grilled chicken, salsa verde, onions and cilantro.",
    price: 10.99,
    category: "Tacos",
    image:
      "https://images.pexels.com/photos/36498698/pexels-photo-36498698.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy"],
  },
  {
    id: 2,
    name: "Beef Burrito",
    description: "Seasoned beef, rice, beans and cheese.",
    price: 12.99,
    category: "Burritos",
    image:
      "https://images.pexels.com/photos/27365297/pexels-photo-27365297.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy"],
  },
  {
    id: 3,
    name: "Cheese Quesadilla",
    description: "Three-cheese blend in grilled tortilla.",
    price: 9.99,
    category: "Quesadillas",
    image:
      "https://images.pexels.com/photos/28443135/pexels-photo-28443135.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Vegetarian"],
  },
  {
    id: 4,
    name: "Chicken Enchiladas",
    description: "Corn tortillas topped with red sauce.",
    price: 13.99,
    category: "Enchiladas",
    image:
      "https://images.pexels.com/photos/37006565/pexels-photo-37006565.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy", "Gluten-Free"],
  },
  {
    id: 5,
    name: "Horchata",
    description: "Traditional sweet rice beverage.",
    price: 3.99,
    category: "Drinks",
    image:
      "https://images.pexels.com/photos/34384845/pexels-photo-34384845.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Vegetarian", "Vegan", "Gluten-Free"],
  },
  {
    id: 6,
    name: "Churros",
    description: "Cinnamon sugar churros with chocolate dip.",
    price: 5.99,
    category: "Desserts",
    image:
      "https://images.pexels.com/photos/36361401/pexels-photo-36361401.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Vegetarian"],
  },
  {
    id: 7,
    name: "Sopes de Chorizo",
    description:
      "Thick masa base topped with chorizo, crema, lettuce and queso fresco.",
    price: 8.99,
    category: "Sopes",
    image:
      "https://images.pexels.com/photos/31822998/pexels-photo-31822998.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy", "Gluten-Free"],
  },
  {
    id: 8,
    name: "Tostada de Ceviche",
    description:
      "Citrus-marinated fish with avocado, tomato, and cilantro on a crispy tostada.",
    price: 11.99,
    category: "Tostadas",
    image:
      "https://images.pexels.com/photos/28959316/pexels-photo-28959316.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy", "Gluten-Free"],
  },
  {
    id: 9,
    name: "Tamales de Puerco",
    description:
      "Steamed corn masa filled with slow-cooked pork with tangy red salsa on the side.",
    price: 4.99,
    category: "Tamales",
    image:
      "https://images.pexels.com/photos/31843933/pexels-photo-31843933.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy", "Gluten-Free"],
  },
  {
    id: 10,
    name: "Pozole Rojo (Cup)",
    description:
      "Hearty hominy stew with pork, chiles, and traditional garnishes.",
    price: 7.99,
    category: "Pozole",
    image:
      "https://images.pexels.com/photos/14179982/pexels-photo-14179982.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Spicy", "Gluten-Free"],
  },
];

export const about = {
  story:
    "Plaza Mexico brings authentic Mexican flavors to New Haven using traditional family recipes passed down through generations. Since opening our doors, we've been committed to delivering the rich, vibrant tastes of Mexico to every plate we serve.",
  mission:
    "Serve exceptional Mexican cuisine while creating memorable dining experiences that keep our community coming back for more.",
  values: ["Authenticity", "Freshness", "Hospitality", "Community"],
};

export const gallery = [
  {
    title: "Restaurant Interior",
    image:
      "https://images.pexels.com/photos/37814058/pexels-photo-37814058.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Chef Special",
    image:
      "https://images.pexels.com/photos/33014390/pexels-photo-33014390.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Family Dining",
    image:
      "https://images.pexels.com/photos/8158285/pexels-photo-8158285.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    review:
      "Best Mexican food in New Haven. The flavors are incredible and the staff makes you feel like family.",
  },
  {
    name: "Michael Davis",
    rating: 5,
    review:
      "Amazing atmosphere and authentic flavors. This is my go-to spot for tacos and margaritas.",
  },
  {
    name: "Emily Brown",
    rating: 5,
    review:
      "Excellent service and delicious tacos. The enchiladas and churros are out of this world too!",
  },
  {
    name: "James Rodriguez",
    rating: 5,
    review:
      "Authentic taste of Mexico right here in New Haven. The carne asada is perfectly seasoned and the customer service is outstanding.",
  },
  {
    name: "Lisa Chen",
    rating: 5,
    review:
      "My family loves coming here! The kids ask to return every week. The portions are generous and the prices are fair.",
  },
  {
    name: "David Thompson",
    rating: 5,
    review:
      "Fantastic dining experience. The guacamole is made fresh, and the staff really knows their menu.",
  },
  {
    name: "Maria Gonzalez",
    rating: 5,
    review:
      "Reminds me of home cooking from my abuela. Every dish is prepared with care and love. Highly recommend Plaza Mexico!",
  },
  {
    name: "Robert Martinez",
    rating: 5,
    review:
      "Best place for late-night Mexican food. The pozole is warm and comforting, perfect for any occasion.",
  },
];

export const hours: Record<string, string> = {
  Monday: "11:00 AM - 09:00 PM",
  Tuesday: "11:00 AM - 09:00 PM",
  Wednesday: "11:00 AM - 09:00 PM",
  Thursday: "11:00 AM - 09:00 PM",
  Friday: "11:00 AM - 10:00 PM",
  Saturday: "11:00 AM - 10:00 PM",
  Sunday: "12:00 PM - 08:00 PM",
};

export const socials = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  twitter: "https://x.com/",
};
