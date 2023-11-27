'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function ClientLink() {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/paths/create`}>
      <Button className="bg-gray-800">Create A New Path</Button>
    </Link>
  );
}

export default ClientLink;
