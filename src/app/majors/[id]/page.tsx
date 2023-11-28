import React from 'react';
import PathsContentComponent from './PathsContentComp';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getMajor } from '@/lib/utils';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/react';
import { Major, Path } from '@/app/(types)/types';

export default async function page({ params }: { params: { id: number } }) {
  // const {
  //   data: major,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ['major'],
  //   queryFn: async () => await getMajor(params.id),
  // });

  // if (isLoading) {
  //   return (
  //     <Spinner
  //       className="flex items-center justify-center min-h-screen"
  //       label="Fetching Major..."
  //       color="warning"
  //     />
  //   );
  // }
  // if (isError) {
  //   console.log(isError);
  //   return <pre>{JSON.stringify(error)}</pre>;
  // }
  const major: Major = await getMajor(params.id);
  const paths = major.paths.filter((p: Path) => p.isDraft == false);
  console.log(paths);
  return (
    <section className="bg-main_pattern min-h-screen py-24">
      <section className="max-w-[1000px] mx-auto  min-h-screen text-black">
        <div className="flex gap-4 items-center my-4">
          <div className="border-2 border-black rounded-md text-3xl font-extrabold flex flex-col justify-center items-center p-2">
            <span className="font-semibold">Major</span>
            <span>Maps</span>
          </div>
          <Input className="" placeholder="🔍 Search majors" />
          <Button>Search</Button>
        </div>
        <div className=" mb-5 text-center flex flex-col">
          <h1 className="text-5xl font-bold mb-2">{major.majorTxt}</h1>
          <span className="font-bold">{major.collegeTxt}</span>
        </div>

        {paths.length === 0 ? (
          <h1 className="text-center">No paths found for this major!</h1>
        ) : (
          <PathsContentComponent
            fourYearPlan={major.fourYearPlan}
            paths={paths}
          />
        )}
      </section>
    </section>
  );
}
