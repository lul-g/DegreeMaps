'use client';
import React from 'react';
import { Path } from '@/app/(types)/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HtmlToReactParser from 'html-react-parser';
import { Content } from '@/app/(types)/types';

function ContentArea({
  publishContentSet,
  name,
  fourYearPlan,
}: {
  publishContentSet: Content[];
  name: string;
  fourYearPlan: string;
}) {
  console.log('publishContentSet', publishContentSet);

  return (
    <section className="mt-2 bg-white rounded-lg">
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

        {publishContentSet?.map((content: Content) => {
          return (
            <TabsContent
              key={content.id}
              className="px-8 pb-2"
              value={content.level}
            >
              <div className="my-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-yellow-400">
                  <span>{name}</span>
                  <Link href={`?fourYearPlan=${fourYearPlan}`}>
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
