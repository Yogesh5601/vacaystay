import { Card, CardContent } from "@/components/ui/card"

interface ValueItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface ValuesSectionProps {
  title: string
  values: ValueItem[]
}

export function ValuesSection({ title, values }: ValuesSectionProps) {
  return (
    <section className="bg-muted py-12 px-4 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}