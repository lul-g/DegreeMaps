'use client';
import React from 'react';
import PathsContentComponent from './PathsContentComp';
import { getMajor } from '@/lib/utils';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export default function Page({ params }: { params: { id: number } }) {
  const {
    data: major,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['major'],
    queryFn: async () => await getMajor(params.id),
  });
  const searchParams = useSearchParams();
  const pathId = searchParams.get('pathId');
  const level = searchParams.get('level');
  // console.log(pathId, level);

  if (isLoading) {
    return (
      <Spinner
        className="flex items-center justify-center min-h-screen"
        label="Fetching Major..."
        color="warning"
      />
    );
  }
  if (isError) {
    //toastify
    console.log(isError);
    return <pre>{JSON.stringify(error)}</pre>;
  }
  const paths = major.paths;
  // console.log(paths);
  return (
    <section className="bg-main_pattern min-h-screen py-24">
      <section className="max-w-[1000px] mx-auto  min-h-screen text-black">
        <div className=" mb-5 text-center flex flex-col">
          <h1 className="text-4xl font-bold mb-2">{major.majorTxt}</h1>
          <span className="font-normal text-gray-500 text-lg">
            {major.collegeTxt}
          </span>
        </div>

        {paths.length === 0 ? (
          <h1 className="text-center">No paths found for this major!</h1>
        ) : (
          <PathsContentComponent
            pathId={pathId}
            level={level}
            paths={paths}
            major={major}
          />
        )}
      </section>
    </section>
  );
}
