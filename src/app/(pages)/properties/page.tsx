import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Star, Filter, Search } from "lucide-react"
import Properties from "@/views/Properties"

export default function PropertiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
    <Properties/>
    </div>
  )
}


