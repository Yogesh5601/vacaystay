import Image from "next/image"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface TeamSectionProps {
  title: string
  team: TeamMember[]
}

export function TeamSection({ title, team }: TeamSectionProps) {
  return (
    <section className="container py-12 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <Image
                src={member.image || "/placeholder.svg?height=200&width=200"}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-primary mb-2">{member.role}</p>
            <p className="text-sm text-muted-foreground">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}