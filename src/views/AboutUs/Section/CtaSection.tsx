import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CtaButton {
    text: string
    href: string
    variant?: "default" | "secondary" | "outline"
  }
  
  interface CtaSectionProps {
    title: string
    description: string
    buttons: CtaButton[]
  }
  
  export function CtaSection({ title, description, buttons }: CtaSectionProps) {
    return (
      <section className="bg-primary text-primary-foreground py-12 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                size="lg"
                variant={button.variant || "secondary"}
                className={button.variant === "outline" ? "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" : ""}
                asChild
              >
                <Link href={button.href}>{button.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    )
  }