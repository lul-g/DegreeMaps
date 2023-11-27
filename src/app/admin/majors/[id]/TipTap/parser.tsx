import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HtmlToReactParser from 'html-react-parser';
import Link from 'next/link';

const Parser = ({
  pathName,
  fourYearPlan,
  currentTab,
  editorContent,
}: {
  pathName: string | undefined;
  fourYearPlan: string | undefined;
  currentTab: string | undefined;
  editorContent: string | null | undefined;
}) => {
  return (
    <div className="bg-main_pattern w-100 p-10 border-3 border-gray-800 rounded-lg">
      <Tabs value={currentTab}>
        <TabsList className="flex gap-4 px-0 bg-transparent text-slate-100 rounded-b-none h-[5rem] child:w-[33.333%] child:rounded-b-none child:rounded-t-lg child:text-xl child:bg-gray-800 child:h-[5rem]">
          <TabsTrigger
            disabled={true}
            value="early"
            className="data-[state=active]:shadow-none shadow-none"
          >
            Early in the Major
          </TabsTrigger>
          <TabsTrigger
            disabled={true}
            value="mid"
            className="data-[state=active]:shadow-none shadow-none"
          >
            Mid-Major
          </TabsTrigger>
          <TabsTrigger
            disabled={true}
            value="late"
            className="data-[state=active]:shadow-none shadow-none"
          >
            Late in the Major
          </TabsTrigger>
        </TabsList>

        <Card className="min-h-[20rem] rounded-t-none border-0 border-t-[15px] border-yellow-400 border-opacity-70">
          <CardHeader className="flex flex-row justify-between items-center pb-4 mb-4 border-b-2 border-yellow-400">
            <span>{pathName}</span>
            <Link href={`?fourYearPlan=${fourYearPlan}`}>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                Four Year Plan
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="shadow-none">
            <TabsContent value="early">
              {HtmlToReactParser(editorContent!)}
            </TabsContent>
            <TabsContent value="mid">
              {HtmlToReactParser(editorContent!)}
            </TabsContent>
            <TabsContent value="late">
              {HtmlToReactParser(editorContent!)}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Parser;
