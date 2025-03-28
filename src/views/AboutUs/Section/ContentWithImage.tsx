import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface ContentWithImageProps {
  title: string
  content: string[]
  imageUrl: string
  imageAlt: string
  reverse?: boolean
  cta?: {
    text: string
    href: string
  }
}

export function ContentWithImage({
  title,
  content,
  imageUrl,
  imageAlt,
  reverse = false,
  cta,
}: ContentWithImageProps) {
  return (
    <section className="container py-12 md:py-24">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className={reverse ? 'order-2 md:order-1' : ''}>
          <h2 className="text-3xl font-bold tracking-tight mb-6">{title}</h2>
          <div className="space-y-4 text-muted-foreground">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {cta && (
            <div className="mt-6">
              <Button asChild>
                <Link href={cta.href}>{cta.text}</Link>
              </Button>
            </div>
          )}
        </div>
        <div className={`relative aspect-video md:aspect-square rounded-xl overflow-hidden ${reverse ? 'order-1 md:order-2' : ''}`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}