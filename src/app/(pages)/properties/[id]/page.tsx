"use client"

import Loader from "@/components/common/Loader";
import PropertyDetail from "@/views/PropertyDetails"
import axios from "axios";
import { use, useEffect, useState } from "react"

interface Rental {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log(id, "rental id");

  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/properties/${id}`);
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        setRental(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching rental:', error);
        setError(error instanceof Error ? error.message : 'Failed to load rental details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRental();
    }
  }, [id]);

  if (loading) {
    return <Loader loading={loading}/>
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!rental) {
    return <div className="p-4">Rental not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-4 container mx-auto">
      <PropertyDetail property={rental} />
    </div>
  );
}


