import { auth } from '@/auth';
import PropertyListings from '@/CMS/PropertyListing/Index';
import DestinationListings from '@/CMS/DestinationListing';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="container mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome, {session.user?.name || session.user?.email}!
          </h1>


          {/* Listings Section */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            <DestinationListings />
            <PropertyListings />
          </div>
        </div>
      </div>
    </div>
  );
}
