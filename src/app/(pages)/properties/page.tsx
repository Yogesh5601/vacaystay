"use client"
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
import axios from "axios"
import { useState, useEffect } from "react"

export default function PropertiesPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProducts(response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-4 container mx-auto">
      <Properties featuredProperties={products}/>
    </div>
  )
}


