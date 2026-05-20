import { ChecklistSection, Benefit, FAQItem, PricingPlan } from '../types';

export const CHANNELS_CHECKLIST: ChecklistSection[] = [
  {
    name: "Interior/Exterior Condition",
    items: [
      "Number of Key(s)",
      "Entertainment/Radio",
      "Navigation/Back up Camera",
      "Wiper Operation/Wiper Blades",
      "Windshield/Window Condition",
      "Upholstery/Carpet",
      "AC Compressor/Controls",
      "Heater & Defroster"
    ]
  },
  {
    name: "Under Hood & Performance",
    items: [
      "Engine Fault Codes",
      "Engine Noise",
      "Emissions Pass",
      "Fluids: Oil/Coolant/Brake Fluid",
      "Engine Air Filter",
      "Belts/Tensioners (condition)"
    ]
  },
  {
    name: "Brakes & Suspension",
    items: [
      "Front Brake Pads & Rotors",
      "Rear Brake Pads & Rotors",
      "LF/RF Brake Lining Condition",
      "Engine Oil/Fluid Leaks",
      "Front & Rear Shock Absorbers",
      "Chassis Nuts & Bolts"
    ]
  },
  {
    name: "Tire Tread & Pressure",
    items: [
      "LF/RF Tire Tread & PSI",
      "LR/RR Tire Tread & PSI",
      "Spare Tire (if equipped)"
    ]
  }
];

export const CLIENT_BENEFITS: Benefit[] = [
  {
    title: "For Mobile Inspectors & Mechanics",
    description: "Built strictly for fast, single-handed operation in the auto yard or garage. No clunky software or signal delays.",
    badge: "For Inspectors",
    points: [
      "Complete comprehensive inspections in under 5 minutes on standard mobile phones.",
      "Automatic offline draft saving guarantees your inspection answers are never lost mid-job.",
      "Instant NHTSA API VIN lookup decodes make, model, year, and production data automatically."
    ]
  },
  {
    title: "For Auto Inspectors & Buyers",
    description: "Generate crystal-clear, professional PDF vehicle evaluations that inspire confidence and accelerate buying decisions.",
    badge: "For Clients & Buyers",
    points: [
      "Impeccably clean, professional multi-page PDF output complete with color-coded inspection scores.",
      "No-login cloud viewing links make sharing reports with buyers via SMS or email as easy as one tap.",
      "High-resolution detailed damage photos embedded cleanly directly in the report pages.",
      "A uniform visual ledger layout built strictly to prevent vehicle transaction friction."
    ]
  }
];

export const PRODUCT_FAQS: FAQItem[] = [
  {
    question: "Do I need to download an App Store application?",
    answer: "No, PPIPro.click scales to any mobile web browser. You just sign in on your phone, and it feels and operates like a native, premium application."
  },
  {
    question: "How is my inspection data stored?",
    answer: "The platform runs directly in your secure cloud environment. Every completed inspection compiles on our robust PDF engine, uploads to your designated secure drive folder, and logs safely in your unified inspect dashboard records vault. You have absolute, permanent ownership of your data."
  },
  {
    question: "Does the PDF Generator support custom branding?",
    answer: "Yes, absolutely! The System Settings tab allows you to customize your company name, full address, contact details, support credentials, and the detailed legal disclaimers that appear on all generated reports."
  },
  {
    question: "How does the automatic VIN Decoder work?",
    answer: "Our system connects directly to the official US NHTSA DOT database. By entering any standard 17-digit VIN, PPIPro decodes the vehicle's model, manufacturer, production year, and weight category instantly."
  },
  {
    question: "Can I customize the checklist categories?",
    answer: "Yes! PPIPro features a checklist builder inside the system settings, meaning you can easily add new rows, adapt categories, and alter elements as vehicle inspection standards adapt."
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Independent Inspector",
    price: "$29",
    period: "month",
    description: "Perfect for mobile mechanics and freelance car inspectors looking to build high-grade client trust.",
    features: [
      "Direct Secure Cloud Sync",
      "Unlimited PDF Reports",
      "Automatic VIN Decoding",
      "Up to 12 damage photos per report",
      "Basic customization tools",
      "Standard email support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Inspection Team Pro",
    price: "$79",
    period: "month",
    description: "Created for mechanics and vehicle inspection teams requiring maximum speed and secure logging.",
    features: [
      "Sync with private cloud drive network",
      "Unlimited PDF Reports",
      "Premium custom headers and profile logos",
      "Secure PIN credential setup",
      "Interactive visual damage charts",
      "Priority 24/7 technical hotline",
      "Custom checklist builder integration"
    ],
    cta: "Deploy Inspector Pro",
    popular: true
  },
  {
    name: "Enterprise Fleet",
    price: "Custom",
    period: "quote",
    description: "Robust inspection governance for national transport services, fleet operations, and multi-location automotive franchises.",
    features: [
      "Custom REST API integrations",
      "Dedicated secure cloud deployment",
      "Bulk database backup archives",
      "SLA guaranteed help desk",
      "Individual inspector license profiles",
      "Dedicated setup engineer"
    ],
    cta: "Contact Enterprise Sales",
    popular: false
  }
];
