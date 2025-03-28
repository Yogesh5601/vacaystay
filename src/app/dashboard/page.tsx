import { auth } from '@/auth';
import SignOutButton from '@/components/common/Buttons/SignOutButton';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-6 flex flex-col">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {session.user?.name || session.user?.email}!
              </h1>
              <SignOutButton />
            </div>
            <div className="mt-4 flex-1 flex items-center justify-center">
              <p className="text-lg text-gray-600">
                You are now logged in to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}