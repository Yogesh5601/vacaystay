import { auth } from '@/auth';
import PropertyListings from '@/CMS/PropertyListing/Index';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full container  mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 flex flex-col"> */}
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {session.user?.name || session.user?.email}!
            </h1>

          </div>

          {/* Content Area */}
          <div className="mt-8 flex-1">
            <div className="bg-white p-4 rounded-lg shadow">

              <PropertyListings />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}