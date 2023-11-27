import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getMajor } from '@/lib/utils';
import { Major, Path } from '@/app/(types)/types';
import { Button } from '@/components/ui/button';
import ClientLink from './ClientLink';
import PathsContentComponent from './PathsContentComp';
import { CopyIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import ClientModal from './ClientModal';
import ClientWrapper from './ClientWrapper';
async function page({ params }: { params: { id: number } }) {
  const major: Major = await getMajor(params.id);
  return (
    <section className="p-4 max-w-[1400px] mx-auto my-10">
      <ClientWrapper major={major} id={params.id} />
    </section>
  );
}

export default page;
