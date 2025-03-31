import React, { useEffect, useState } from 'react';
import Hero from './sections/Hero';
import CallToAction from './sections/CallToAction';
import Testimonial from './sections/Testimonials';
import FeaturedProperties from './sections/FeaturedProperties';
import PopularDestination from './sections/PopularDestination';
import WhyChoose from './sections/WhyChoose';
import axios from 'axios';

const LandingPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, propRes] = await Promise.all([
          axios.get('/api/destinations'),
          axios.get('/api/properties'),
        ]);

        setDestinations(destRes.data.result.data.slice(0, 4));
        setProperties(propRes.data.result.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingDestinations(false);
        setLoadingProperties(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="space-y-4 w-full">
      <Hero />
      {loadingDestinations ? (
        <p className="text-center text-gray-500">Loading destinations...</p>
      ) : (
        <PopularDestination destinations={destinations} />
      )}
      {loadingProperties ? (
        <p className="text-center text-gray-500">Loading properties...</p>
      ) : (
        <FeaturedProperties properties={properties} />
      )}
      <WhyChoose />
      <Testimonial />
      <CallToAction />
    </main>
  );
};

export default LandingPage;
