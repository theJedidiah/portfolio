import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "qomprice",
    title: "QomPrice",
    description: "Built and launched a Ghana-focused price comparison platform that helps shoppers quickly discover deals across categories.",
    role: "engineering",
    roleLabel: "Frontend Developer",
    thumbnail: "/projects/automation.jpg",
    techStack: ["React", "Next.js", "JavaScript"],
    tools: ["Figma", "API Integration", "Vercel"],
    featured: true,
    year: 2025,
    problem: "Online shoppers in Ghana often compare prices manually across multiple stores, which is slow and inconsistent.",
    solution: "Created QomPrice as a searchable product discovery and comparison experience focused on local relevance and clear pricing visibility.",
    outcome: "Shipped a live platform at qomprice.com and established a foundation for scalable product indexing and discovery.",
    metrics: ["Live at qomprice.com", "Ghana market focus", "Fast price discovery"],
  },
  {
    id: "2",
    slug: "business-dashboard-kowri",
    title: "Business Dashboard",
    description:
      "A collection and disbursement platform for businesses, tracking invoices, income, and payment flows across operations.",
    role: "both",
    roleLabel: "Product Manager + Frontend Developer",
    thumbnail: "/projects/fintech.jpg",
    techStack: ["React", "API Integration"],
    tools: ["Figma", "SEVN Ghana LTD (Kowri)", "Fintech"],
    featured: true,
    year: 2025,
    problem:
      "Businesses needed one clear place to manage collections and disbursements while maintaining visibility across invoices and incoming payments.",
    solution:
      "Defined and prioritized product workflows while also implementing frontend delivery for critical dashboard experiences and API-driven payment views.",
    outcome:
      "Scaled the platform to support GHS 100M in weekly throughput and improved operational confidence for business finance teams.",
    metrics: ["GHS 100M weekly throughput", "Hybrid PM + Dev contribution", "Fintech · SEVN Ghana"],
  },
  {
    id: "3",
    slug: "backoffice-platform-kowri",
    title: "Backoffice Platform",
    description:
      "An internal operations platform for handling business requests, payout confirmations, and compliance workflows with speed and clarity.",
    role: "both",
    roleLabel: "Product Manager + Developer",
    thumbnail: "/projects/orbit.jpg",
    techStack: ["React", "JavaScript"],
    tools: ["Figma", "SEVN Ghana LTD (Kowri)", "Operations"],
    featured: true,
    year: 2025,
    problem:
      "Operational teams needed faster, lower-friction handling of approvals and confirmations without sacrificing compliance controls.",
    solution:
      "Drove product decisions and shipped key frontend functionality to streamline request routing, payout confirmation steps, and internal workflow visibility.",
    outcome:
      "Reduced operational bottlenecks by improving request handling speed and decision clarity for internal support and finance teams.",
    metrics: ["Faster internal turnaround", "Compliance workflow visibility", "Hybrid PM + Dev ownership"],
  },
  {
    id: "4",
    slug: "very-ghanaian",
    title: "Very Ghanaian",
    description:
      "Contributed to the digital storefront for a heritage lifestyle brand celebrating Ghanaian identity through garments and storytelling.",
    role: "engineering",
    roleLabel: "Frontend Developer",
    thumbnail: "/projects/lumina.jpg",
    techStack: ["React", "JavaScript", "Ecommerce"],
    tools: ["Figma", "Shopify", "Content Strategy"],
    featured: true,
    year: 2022,
    problem:
      "The brand needed an online storefront that preserved cultural storytelling while supporting smooth product discovery and checkout journeys.",
    solution:
      "Implemented and refined frontend storefront experiences, balancing visual identity with practical ecommerce flow and content structure.",
    outcome:
      "Improved the shopping experience for a global audience while maintaining a strong Ghanaian brand voice at veryghanaian.com.",
    metrics: ["Live at veryghanaian.com", "Heritage-driven brand storytelling", "Global storefront reach"],
  },
];