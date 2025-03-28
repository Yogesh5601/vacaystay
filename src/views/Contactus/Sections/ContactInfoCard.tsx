import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

type ContactInfoCardProps = {
  icon: ReactNode
  title: string
  children: ReactNode
}

export const ContactInfoCard = ({ icon, title, children }: ContactInfoCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <div className="text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}