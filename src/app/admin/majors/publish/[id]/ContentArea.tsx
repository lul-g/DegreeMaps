'use client';
import React, { useState } from 'react';
import { Major, Path } from '@/app/(types)/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HtmlToReactParser from 'html-react-parser';
import { Content } from '@/app/(types)/types';
import { updatePath, updatePublish } from '@/lib/utils';
import { Spinner } from '@nextui-org/spinner';

function ContentArea({
  path,
  draftContentSet,
  name,
  major,
}: {
  path: Path;
  draftContentSet: Content[];
  name: string;
  major: Major;
}) {
  const savePublish = async () => {
    setPublishing(true);
    const response = await updatePath({
      ...path,
      isDraft: false,
      majorId: major.id,
    });
    const response0 = await updatePublish(draftContentSet[0]);
    const response1 = await updatePublish(draftContentSet[1]);
    const response2 = await updatePublish(draftContentSet[2]);
    setTimeout(() => {
      setPublishing(false);
    }, 1000);
  };
  console.log('publishContentSet', draftContentSet);
  const [publishing, setPublishing] = useState(false);

  return (
    <section className="mt-2 bg-white rounded-lg relative">
      <Button
        className="bg-yellow-400 text-black hover:bg-yellow-500 absolute right-[-8rem] top-[-15rem]"
        onClick={savePublish}
        disabled={publishing}
      >
        Publish Content{' '}
        {publishing ? <Spinner size="sm" className="ms-2" /> : '🚀'}
      </Button>
      <Tabs defaultValue="early" className="border-black w-[100%] mt-10">
        <TabsList className="flex justify-between gap-3 items-center text-slate-100 m-auto p-0 rounded-b-none border-b-[12px] border-yellow-400 child:bg-gray-800 child:h-16 h-16 child:w-[33%] child:rounded-t-lg child:rounded-b-none child:mb-[.75rem]">
          <TabsTrigger
            className="data-[state=active]:shadow-none"
            value="early"
          >
            Early in the Major
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:shadow-none" value="mid">
            Mid-Major
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:shadow-none" value="late">
            Late in the Major
          </TabsTrigger>
        </TabsList>

        {draftContentSet?.map((content: Content) => {
          return (
            <TabsContent
              key={content.id}
              className="px-8 pb-2"
              value={content.level}
            >
              <div className="my-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-yellow-400">
                  <span>{name}</span>
                  <Link href={`?fourYearPlan=${major.fourYearPlan}`}>
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                      Four Year Plan
                    </Button>
                  </Link>
                </div>
                {/* RTF */}
                {HtmlToReactParser(content.rtf)}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}

export default ContentArea;
