export const SITE_NAME = "RISE";
export const PRIMARY_COLOR = "#ffb800";

// Update navigation items to match available pages
export const NAVIGATION_ITEMS = [
  { label: "BASKETBALL", href: "/basketball" },
  { label: "PERFORMANCE", href: "/performance" },
  { label: "BARBER", href: "/barber" },
];

export const SECONDARY_NAV_ITEMS = [
  { label: "COFFEE", href: "/coffee" },
  { label: "SUPPLEMENTS", href: "/supplements" },
  { label: "CONTACT", href: "/contact" },
  { label: "REVIEWS", href: "/reviews" },
];

export const FOOTER_LINKS = {
  contact: [
    {
      label: "info@risesportscomplex.com",
      href: "mailto:info@risesportscomplex.com",
    },
    { label: "Direct Phone Line: 1-587-999-7473", href: "tel:+15879997473" },
    {
      label:
        "Physical Address: RISE SPORTS COMPLEX, #01 33 St NE Calgary, AB T2E 7K1",
      href: "https://maps.app.goo.gl/hpvXcuwFTz7t1pnNA",
    },
  ],
  company: [
    { label: "RISE Basketball", href: "/basketball" },
    { label: "RISE Performance", href: "/performance" },
    { label: "RISE Academy Sport & Education", href: "/academy" },
    { label: "RISE Playground", href: "/playground" },
    { label: "Teams & Players", href: "/teams" },
    { label: "Game Schedule", href: "/schedule" },
    { label: "BOOM Coffee", href: "/coffee" },
    { label: "ProRise Nutrition", href: "/supplements" },
    { label: "Contact Us", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Cookie Preferences", href: "/cookies" },
    { label: "Location", href: "/location" },
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/rise.basketball/",
      icon: "Instagram",
    },
    {
      label: "Twitter",
      href: "https://x.com/_Risebasketball",
      icon: "Twitter",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@rise.basketball",
      icon: "Youtube",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/RisebasketballCalgary/",
      icon: "Facebook",
    },
  ],
};

export const PAYMENT_METHODS = [
  { name: "Visa", src: "/payment-icons/visa.svg" },
  { name: "Mastercard", src: "/payment-icons/mastercard.svg" },
  { name: "Apple Pay", src: "/payment-icons/apple-pay.svg" },
  { name: "Google Pay", src: "/payment-icons/google-pay.svg" },
  { name: "PayPal", src: "/payment-icons/paypal.svg" },
];

export const PARTNER_LOGOS = [
  { name: "Havenz Corporation", image: "/partnerImages/havenz.png" },
  {
    name: "Luxury Listing Group",
    image: "/partnerImages/luxury.png",
  },
  { name: "Exmerce", image: "/partnerImages/exmerce.png" },
  { name: "Century 21", image: "/partnerImages/century.png" },
  { name: "Nike", image: "/partnerImages/nike.png" },
];

export const MEMBERSHIP_PLANS = [
  {
    id: "full-year",
    featured: true,
    badge: "BEST VALUE",
    title: "RISE FULL YEAR Basketball Membership",
    price: 225,
    period: "month",
    description:
      "Perfect for players looking to develop their skills and take their game to the next level.",
    features: [
      "Unlimited access to all facilities",
      "Priority booking for courts",
      "Access to all training programs",
    ],
    ctaText: "JOIN NOW",
    learnMoreText: "LEARN MORE",
  },
  {
    id: "jr-rise",
    featured: false,
    title: "Jr. RISE Basketball Membership",
    price: 125,
    period: "month",
    description:
      "Perfect for young athletes ages 5-12 looking to develop their skills.",
    features: [
      "Junior skill classes",
      "Age-appropriate training",
      "Supervised play sessions",
    ],
    ctaText: "JOIN NOW",
    learnMoreText: "LEARN MORE",
  },
  {
    id: "performance",
    featured: false,
    title: "RISE Performance Membership",
    price: 145,
    period: "month",
    description:
      "Unlock our fitness facilities & fitness programs for all ages.",
    features: [
      "Access to fitness facilities",
      "Group fitness classes",
      "Strength & Conditioning Training",
    ],
    ctaText: "JOIN NOW",
    learnMoreText: "LEARN MORE",
  },
];

export const PERFORMANCE_FEATURES = [
  {
    title: "Top-Quality Fitness Room",
    description:
      "State-of-the-art equipment for all your fitness needs, from cardio to strength training.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Strength Training Zone",
    description:
      "Dedicated area with weights and racks for building strength and endurance at all levels.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Functional Training Area",
    description:
      "Flexible training space with turf and equipment for dynamic workouts.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "High-Energy Group Classes",
    description:
      "Join our expert-led classes that combine fun and results for all fitness levels.",
    image: "/placeholder.svg?height=300&width=400",
  },
];

export const COFFEE_FEATURES = [
  {
    title: "Coffee and Tea",
    description:
      "A selection of freshly brewed coffee and premium teas crafted to energize and delight.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Protein Shakes",
    description:
      "Robust protein shakes designed to support recovery and performance, made with premium ProRise Supplements.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Healthy Snacks and Treats",
    description:
      "Grab and go nutritious snacks perfect for before or after your workout, made with quality ingredients.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Community Space",
    description:
      "A hub of freshly brewed coffee and premium fuel crafted to energize the RISE community.",
    image: "/placeholder.svg?height=300&width=400",
  },
];

export const SUPPLEMENT_PRODUCTS = [
  {
    id: "arctic-water",
    title: "Arctic Chilled Water",
    description: "Clean, filtered water + minerals",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "whey-chocolate",
    title: "Whey Protein Powder",
    description: "Chocolate flavor",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "magnesium",
    title: "Magnesium Powder",
    description: "Unflavored",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "whey-vanilla",
    title: "Whey Protein Powder",
    description: "Vanilla flavor",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
];

export const BARBER_SERVICES = [
  {
    id: "regular-haircut",
    title: "Regular Haircut",
    duration: "30 min",
    price: 45.0,
  },
  {
    id: "haircut-beard-razor",
    title: "Haircut + Beard Trim + Razor",
    duration: "45 min",
    price: 65.0,
  },
  {
    id: "haircut-beard-machine",
    title: "Haircut + Beard Trim (Machine)",
    duration: "40 min",
    price: 55.0,
  },
];

export const UPCOMING_GAMES = [
  {
    id: 1,
    team1: "Team Blue",
    team2: "Team Red",
    date: "Mar 25, 2025",
    time: "7:30 PM",
  },
  {
    id: 2,
    team1: "Team Green",
    team2: "Team Yellow",
    date: "Mar 27, 2025",
    time: "6:00 PM",
  },
  {
    id: 3,
    team1: "Team Black",
    team2: "Team White",
    date: "Apr 2, 2025",
    time: "8:00 PM",
  },
  {
    id: 4,
    team1: "Team Blue",
    team2: "Team Green",
    date: "Apr 5, 2025",
    time: "7:00 PM",
  },
  {
    id: 5,
    team1: "Team Red",
    team2: "Team Yellow",
    date: "Apr 8, 2025",
    time: "6:30 PM",
  },
  {
    id: 6,
    team1: "Team Black",
    team2: "Team Blue",
    date: "Apr 12, 2025",
    time: "7:30 PM",
  },
  {
    id: 7,
    team1: "Team White",
    team2: "Team Red",
    date: "Apr 15, 2025",
    time: "8:00 PM",
  },
  {
    id: 8,
    team1: "Team Yellow",
    team2: "Team Black",
    date: "Apr 18, 2025",
    time: "7:00 PM",
  },
  {
    id: 9,
    team1: "Team Blue",
    team2: "Team White",
    date: "Apr 22, 2025",
    time: "6:30 PM",
  },
  {
    id: 10,
    team1: "Team Green",
    team2: "Team Red",
    date: "Apr 25, 2025",
    time: "7:30 PM",
  },
];

export const TOP_PLAYERS = [
  {
    id: 1,
    name: "Player Name",
    games: 12,
    points: 18.5,
    rebounds: 6.2,
    assists: 4.1,
  },
  {
    id: 2,
    name: "Player Name",
    games: 12,
    points: 17.2,
    rebounds: 5.8,
    assists: 3.9,
  },
  {
    id: 3,
    name: "Player Name",
    games: 12,
    points: 16.8,
    rebounds: 7.1,
    assists: 2.5,
  },
  {
    id: 4,
    name: "Player Name",
    games: 12,
    points: 15.9,
    rebounds: 4.3,
    assists: 6.7,
  },
  {
    id: 5,
    name: "Player Name",
    games: 12,
    points: 15.1,
    rebounds: 5.5,
    assists: 3.2,
  },
  {
    id: 6,
    name: "Player Name",
    games: 12,
    points: 14.7,
    rebounds: 8.2,
    assists: 1.8,
  },
  {
    id: 7,
    name: "Player Name",
    games: 12,
    points: 13.9,
    rebounds: 3.7,
    assists: 5.4,
  },
  {
    id: 8,
    name: "Player Name",
    games: 12,
    points: 12.5,
    rebounds: 6.0,
    assists: 4.8,
  },
];

export const PLAN_COMPARISON = [
  {
    feature: "Practice T-shirt & shorts",
    fullYear: true,
    seasonal: true,
    jrRise: false,
  },
  {
    feature: "Reversible",
    fullYear: true,
    seasonal: false,
    jrRise: true,
  },
  {
    feature: "25% Off Gym memberships",
    fullYear: true,
    seasonal: false,
    jrRise: true,
  },
  {
    feature: "10% Discount",
    fullYear: true,
    seasonal: true,
    jrRise: false,
  },
  {
    feature: "4 Weekly Practices",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Free admission and merchandise discounts",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Meal planning and nutrition guidance",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "All Team fees waived",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Free access to meditation and recovery sessions",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Access to basketball camps during holidays",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Full year and access to RISE tournaments and other leagues",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
];

export const REVIEWS = Array.from({ length: 16 }).map((_, index) => ({
  id: index + 1,
  rating: 5,
  text: "Amazing facility and great coaches. The basketball program is top-notch and my kids love it!",
  author: "John Smith",
  date: "2 days ago",
  avatar: "/placeholder.svg?height=50&width=50",
}));
