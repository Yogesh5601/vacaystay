import { team } from "@/data";
import { ContentWithImage } from "./Section/ContentWithImage";
import { CtaSection } from "./Section/CtaSection";
import { HeroSection } from "./Section/HeroSection";
import { TeamSection } from "./Section/TeamSection";
import { ValuesSection } from "./Section/ValuesSection";


export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection
          title="About VacayStay"
          subtitle="Connecting travelers with exceptional vacation rentals since 2010."
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMHdvcmtpbmd8ZW58MHx8MHx8fDA%3D"
        />

        <ContentWithImage
          title="Our Story"
          content={[
            "VacayStay was founded in 2010 with a simple mission: to make finding and booking the perfect vacation rental as easy as possible. What started as a small collection of properties in a few popular destinations has grown into a global platform with thousands of curated properties across hundreds of destinations.",
            "Our founders, Jane and John Smith, experienced firsthand the challenges of finding quality vacation rentals during their own travels. Frustrated by misleading listings, complicated booking processes, and lack of customer support, they decided to create a better solution.",
            "Today, VacayStay is trusted by millions of travelers worldwide who rely on our platform to discover, book, and enjoy exceptional vacation experiences. We remain committed to our original vision of making vacation rentals accessible, reliable, and enjoyable for everyone."
          ]}
          imageUrl="https://images.unsplash.com/photo-1529981624915-4c372fcc50dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG91ciUyMHN0b3J5fGVufDB8fDB8fHww"
          imageAlt="Company founders"
        />

        <ValuesSection
          title="Our Values"
          values={values}
        />

        <TeamSection
          title="Meet Our Team"
          team={team}
        />

        <ContentWithImage
          title="Our Mission"
          content={[
            "At VacayStay, our mission is to connect travelers with exceptional vacation rentals that feel like home, while providing property owners with a reliable platform to showcase their spaces.",
            "We believe that the right accommodation can transform a good trip into an unforgettable experience. That's why we carefully curate our properties, ensuring they meet our high standards for quality, comfort, and authenticity.",
            "We're committed to making the booking process transparent and stress-free, with no hidden fees or surprises. Our dedicated customer support team is available 24/7 to assist both travelers and property owners, ensuring a smooth experience for everyone."
          ]}
          imageUrl="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG91ciUyMG1pc3Npb258ZW58MHx8MHx8fDA%3D"
          imageAlt="Beautiful vacation rental"
          reverse
          cta={{ text: "Explore Our Properties", href: "/properties" }}
        />

        <CtaSection
          title="Join Our Growing Community"
          description="Whether you're looking for your next vacation spot or want to list your property, we're here to help."
          buttons={[
            { text: "Find Your Next Stay", href: "/properties" },
            { text: "Become a Host", href: "/contact", variant: "outline" }
          ]}
        />
      </main>
    </div>
  )
}

const values = [
  {
    title: "Quality & Trust",
    description:
      "We carefully vet all properties to ensure they meet our high standards for quality, comfort, and accuracy.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Exceptional Service",
    description: "Our dedicated support team is available 24/7 to assist both travelers and property owners.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21.73 18.35 20 16.76a2 2 0 0 0-2.02-.4 1.99 1.99 0 0 0-1.23 1.29l-.36 1.33a10 10 0 0 1-6.07-6.07l1.33-.36a1.99 1.99 0 0 0 1.29-1.23 2 2 0 0 0-.4-2.02L10.76 7.3a2 2 0 0 0-2.47-.16L6.8 8.06a2 2 0 0 0-.86 1.45c-.13 1.83.44 4.22 1.68 6.43 1.32 2.34 3 4.02 5.34 5.34 2.21 1.24 4.6 1.81 6.43 1.68a2 2 0 0 0 1.45-.86l.92-1.49a2 2 0 0 0-.16-2.47Z" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description: "We believe in clear, upfront pricing with no hidden fees or surprises.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
        <path d="M2 13h10" />
        <path d="m9 16 3-3-3-3" />
      </svg>
    ),
  },
  {
    title: "Community",
    description:
      "We foster connections between travelers and hosts, creating a global community of like-minded individuals.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "We continuously improve our platform to make finding and booking vacation rentals easier and more enjoyable.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2v8" />
        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />
        <path d="M22 22H2" />
        <path d="m16 6-4 4-4-4" />
        <path d="M16 18a4 4 0 0 0-8 0" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    description: "We're committed to promoting sustainable travel practices and supporting eco-friendly properties.",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 22a8 8 0 0 1 8-8" />
        <path d="M2 22a8 8 0 0 0 8-8" />
        <path d="M12 14a7 7 0 0 0 7 7" />
        <path d="M12 14a7 7 0 0 1 7 7" />
        <path d="M5 3a5 5 0 0 1 7 5" />
        <path d="M19 3a5 5 0 0 0-7 5" />
        <path d="M12 8a5 5 0 0 0 0 10" />
        <path d="M12 8a5 5 0 0 1 0 10" />
      </svg>
    ),
  },
]


