"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Destinations from "@/views/Destinations";
import Loader from "@/components/common/Loader";

export default function DestinationPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; 
  const [sortBy, setSortBy] = useState("recommended");

  const fetchProducts = async (pageNum = 1, sortOption = "recommended") => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/destination?page=${pageNum}&limit=${limit}&sort=${sortOption}`);
      setProducts(response.data.result.data);
      setTotalPages(Math.ceil(response.data.result.pagination.total / limit));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, sortBy);
  }, [page, sortBy]);

  return (
    <div className="flex flex-col min-h-screen px-4  container mx-auto">
      {loading ? (
     <Loader loading={loading || false} />
      ) : (
        <Destinations
          destinations={products}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
    </div>
  );
}



