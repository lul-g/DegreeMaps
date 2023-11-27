import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Divider } from '@nextui-org/react';
import { Major } from '@/app/(types)/types';
import { DataTable } from './DataTable';
import { columns } from './columns';
import axios from 'axios';
import { getMajors } from '@/lib/utils';

async function page() {
  const majors: Major[] = await getMajors();
  const filteredMajors: Major[] = majors.filter((m) => m.id === m.major);
  return (
    <section className="min-h-screen p-4">
      <Card>
        <CardHeader>
          <CardTitle>Major List</CardTitle>
          <CardDescription>
            A list of all NKU majors with their properties.
          </CardDescription>
        </CardHeader>
        {/* <Divider /> */}
        <CardContent>
          <DataTable columns={columns} data={filteredMajors} />
        </CardContent>
        {/* <Divider /> */}
      </Card>
    </section>
  );
}

export default page;
