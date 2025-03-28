import Image from "next/image"

type HeroSectionProps = {
  title: string
  subtitle: string
  backgroundImage: string
}

export const HeroSection = ({ title, subtitle, backgroundImage }: HeroSectionProps) => {
  return (
    <section className="relative py-12 md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}