// 'use client'
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';

// export default function DashboardNav() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/login');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/dashboard" className="text-xl font-bold">
//           Vacation Rentals CMS
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link 
//             href="/dashboard" 
//             className={`px-3 py-2 rounded ${pathname === '/dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
//           >
//             Dashboard
//           </Link>
//           <Link 
//             href="/dashboard/products/new" 
//             className={`px-3 py-2 rounded ${pathname.startsWith('/dashboard/products') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
//           >
//             Properties
//           </Link>
//           <Button variant="destructive" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// }