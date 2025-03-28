// components/hero-section.tsx
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface HeroSectionProps {
  title: string
  subtitle: string
  showSearch?: boolean
  backgroundImage?: string
}

export function HeroSection({ 
  title, 
  subtitle, 
  showSearch = true,
  backgroundImage = "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWxzfGVufDB8fDB8fHww"
}: HeroSectionProps) {
  return (
    <section className="relative py-12 md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
          {showSearch && (
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search destinations" className="pl-9" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}