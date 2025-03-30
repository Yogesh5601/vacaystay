import { auth } from '@/auth';
import AddProperty from '@/CMS/NewProperty'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const session = await auth();
  
    if (!session) {
      redirect('/login');
    }
  return (
    <div className='w-full'><AddProperty/></div>
  )
}
