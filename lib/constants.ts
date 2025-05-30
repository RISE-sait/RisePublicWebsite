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
  { label: "ABOUT US", href: "/contact" },
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
    { label: "Game Schedule", href: "/basketball#programs" },
    { label: "BOOM Coffee", href: "/coffee" },
    { label: "ProRise Nutrition", href: "/supplements" },
    { label: "Contact Us", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Cookie Preferences", href: "/cookies" },
    { label: "Location", href: "/contact" },
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
    badge: "GREAT VALUE",
    title: "Jr. RISE Basketball Membership",
    price: 125,
    period: "month",
    description:
      "Perfect for young athletes ages 5-9 looking to develop their skills.",
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
    badge: "GREAT VALUE",
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
    image: "/performance-page-images/qualityfitness.jpg",
  },
  {
    title: "Strength Training Zone",
    description:
      "Dedicated area with weights and racks for building strength and endurance at all levels.",
    image: "/performance-page-images/strength.jpg",
  },
  {
    title: "Functional Training Area",
    description:
      "Flexible training space with turf and equipment for dynamic workouts.",
    image: "/performance-page-images/functional.jpg",
  },
  {
    title: "High-Energy Group Classes",
    description:
      "Join our expert-led classes that combine fun and results for all fitness levels.",
    image: "/performance-page-images/groupclass.jpg",
  },
];

export const COFFEE_FEATURES = [
  {
    title: "Coffee and Tea",
    description:
      "A selection of freshly brewed coffee and premium teas crafted to energize and delight.",
    image: "/coffee-page-images/coffeecupsoon.webp",
  },
  {
    title: "Protein Shakes",
    description:
      "Robust protein shakes designed to support recovery and performance, made with premium ProRise Supplements.",
    image: "/coffee-page-images/smoothiesoon.png",
  },
  {
    title: "Healthy Snacks and Treats",
    description:
      "Grab and go nutritious snacks perfect for before or after your workout, made with quality ingredients.",
    image: "/coffee-page-images/snackssoon.png",
  },
  {
    title: "Community Space",
    description:
      "A hub of freshly brewed coffee and premium fuel crafted to energize the RISE community.",
    image: "/coffee-page-images/communitysoon.png",
  },
];

export const SUPPLEMENT_PRODUCTS = [
  {
    id: "arctic-water",
    title: "Arctic Chilled Water",
    description: "Clean, filtered water + minerals",
    price: 4.99,
    image: "/supplements-page-images/risewater.png",
  },
  {
    id: "whey-chocolate",
    title: "Whey Protein Powder",
    description: "Chocolate flavor",
    price: 49.99,
    image: "/supplements-page-images/chocolate.png",
  },
  {
    id: "magnesium",
    title: "Magnesium Powder",
    description: "Unflavored",
    price: 39.99,
    image: "/supplements-page-images/magnesium.png",
  },
  {
    id: "whey-vanilla",
    title: "Whey Protein Powder",
    description: "Vanilla flavor",
    price: 49.99,
    image: "/supplements-page-images/vanilla.png",
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
    feature: "Official RISE Practice T-Shirt for On-Court Training",
    fullYear: true,
    seasonal: true,
    jrRise: false,
  },
  {
    feature: "RISE Game-Day Jersey & Shorts",
    fullYear: true,
    seasonal: true,
    jrRise: false,
  },
  {
    feature: "Exclusive RISE Gear Package – Backpack, Water Bottle & Keychain",
    fullYear: true,
    seasonal: false,
    jrRise: true,
  },
  {
    feature: "Member Discounts on Additional Camps & Skill Programs",
    fullYear: true,
    seasonal: false,
    jrRise: true,
  },
  {
    feature: "10% Off RISE Basketball Merchandise & Apparel",
    fullYear: true,
    seasonal: false,
    jrRise: true,
  },
  {
    feature: "Unlimited Drop-In Access & Additional Classes",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Personalized Meal Planning & Nutritional Coaching",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Tryout Fees Waived for All Internal RISE Programs",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Access to Film Room & Strategy Classroom Sessions",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
  {
    feature: "Full Access to Our State-of-the-Art Basketball Weight Room",
    fullYear: true,
    seasonal: false,
    jrRise: false,
  },
];

export const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: `Rise is not just a facility… Rise is our family ‘s home since 2018. 
    We appreciate how they make a big impact to our son’s development as an athlete and as a human being. 
    From basketball fundamentals, in-house league, strength conditioning and basketball IQ development. 
    Rise helps us parent our son with sense of community that uplift and support one another. 
    Shout out to all the Coaches that make a big impact since the beginning Coach K, Ale, Coach Ricky, Coach Lashiya, Coach Norman, Coach Lloyd, Coach Steven. 
    With the Rise facility we know that there will be lots of family like ours that will find this their HOME. Thank you RISE FAM.`,
    author: "PeFam Adventure",
    date: "May 2025",
  },
  {
    id: 2,
    rating: 5,
    text: `Our two boys, Tyler and Tristan, have been with Rise Basketball since they were 5 and 7 years old! 
    From the very beginning, the sense of community has been so welcoming, and the coaches are both knowledgeable and inspiring. 
    Now that they have a state-of-the-art facility, it truly is the full package. We especially love the strength training, which helps a lot their basketball development. 
    Rise Basketball is a place where players not only improve their skills but also build lasting friendships with fellow athletes. 
    We’re incredibly grateful to have been part of the Rise family since day one. 
    Our kids absolutely love it here, and we couldn’t imagine a better program for them. 
    Highly recommend Rise Basketball to anyone looking for a top-notch basketball experience!`,
    author: "Alex Briones",
    date: "January 2025",
  },
  {
    id: 3,
    rating: 5,
    text: `Rise Basketball is an incredible organization that truly cares about the development of young athletes both on and off the court. 
    The coaches are knowledgeable, supportive, and passionate about helping players grow in skill, confidence, and character. 
    The facility is top-notch, with everything you need to excel. 
    Whether you're just starting out or looking to take your game to the next level, 
    Rise Basketball is the place to be. Highly recommended!`,
    author: "Sunny Sarpal",
    date: "December 2024",
  },
  {
    id: 4,
    rating: 5,
    text: `Amazing customer service. Everyone is so friendly, love the environment. Lovely man named Jakub helped me out and I feel comfortable here. 
    Helped me with my skills and confidence. Amazing price for food and drinks. I really recommend all year you get a lot of benefits`,
    author: "Ezana Teka",
    date: "May 2025",
  },
  {
    id: 5,
    rating: 5,
    text: `Rise is one of the best clubs in Calgary and there program for newcomers in basketball is amazing. 
    Coach josh is a tremendous coach who pushes us hard and doesn’t just treat us like his job, but like family. 
    I highly recommend rise basketball for a club team and coach josh for mentoring.`,
    author: "Jahan Dhanjal",
    date: "April 2025",
  },
  {
    id: 6,
    rating: 5,
    text: `This is definitely one of the best facilities in Alberta. It’s so clean and an amazing vibe`,
    author: "Declan Maguire",
    date: "January 2025",
  },
];

export const BASKETBALL_PAGE_IMAGES = [
  { alt: "RISEgirls1", src: "/basketball-page-images/bballpage1.jpg" },
  {
    alt: "RISEboys1",
    src: "/basketball-page-images/bballpage2.jpg",
  },
  { alt: "RISEgirls2", src: "/basketball-page-images/bballpage3.jpg" },
];

export const STARTING_PRICE = {
  "b540343f-b311-46fb-9c50-ce71acad79f5": 103.8, // RISE FULL YEAR Basketball Membership
  "4353fe3b-6e14-4dbe-a140-65911d4819e0": 135.0, // Jr. RISE Elite Hooper (Ages 5-8)
  "7bbbc0ab-4766-48bb-9161-b1ea8911ad3f": 0, //2025 Spring Club Membership
  "2dc352ca-55e1-4969-b6a2-4e403fe86c88": 0, //Seasonal Membership- Winter Rise League
  "c2bfdfaa-47be-48ec-86af-9c73888f3f35": 0, //High School Pro Club
  "c4ba2d9c-582c-4c26-8eed-ff42f8ff35d3": 0, //Gym Membership
  "80dd34b6-152d-4957-aa1b-59594a741a37": 141.66, //Jr. Rise Seasonal (3 Months)
  "2bd90cd0-8c7b-4e89-aecd-01da27ddc8be": 47.0, //Open Gym- Strength Room and Courts
  "a74fce85-94c9-4ee3-a193-5dd25fcbe526": 0, //PAYMENT PLAN 2025 SPRING CLUB
  "4d78eeee-febf-4a97-9f23-6583f271088e": 0, //Rise Basketball Full Year Membership No.2
  "05372c50-0451-4630-8f37-5402023bb4a4": 85.0, //Rise Full Year Family Member Guided Strength Gym Membership
  "3d7aea9f-6a42-43c8-8d28-c5ec37907d97": 0, //Seasonal member - Rise WINTER LEAGUE
  "ca06387b-3e2a-4f2b-8b17-9996df2f25fa": 0, //SPRING RISE LEAGUE 2025
  "077bbea4-6374-44fd-a13d-4e3dd197c073": 155.0, //Strength Room Unlimited Membership
};
