'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Content, CreateInfoType, Path } from '@/app/(types)/types';
import { Spinner } from '@nextui-org/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { getPath } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import TipTapEditor from './TipTap/tip-tap';
import Parser from './TipTap/parser';
import { updateDraft } from '@/lib/utils';

function PathsContentComponent({
  createInfo,
  paths,
  fourYearPlan,
  selectedPathId,
  setSelectedPathId,
  selectedPath,
  setSelectedPath,
  updateKey,
}: {
  createInfo: CreateInfoType;
  paths: Path[] | undefined;
  fourYearPlan: string | undefined;
  selectedPathId: number | null;
  setSelectedPathId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPath: Path | null;
  setSelectedPath: React.Dispatch<React.SetStateAction<Path | null>>;
  updateKey: boolean;
}) {
  const [selectedLevel, setSelectedLevel] = React.useState<string>('early');

  const [contentArr, setContentArr] = React.useState<
    Content[] | null | undefined
  >();
  const [saveState, setSaveState] = useState<string>('');

  const params = useParams();

  const saveDraft = async () => {
    const draft = contentArr?.find(
      (content) => content.level === selectedLevel
    )!;
    setSaveState('Saving . . .');
    const response = await updateDraft(draft);
    if (response?.status === 200) {
      setSaveState('Draft Saved✔️');
    } else {
      setSaveState('Error Saving❗');
    }
  };

  useEffect(() => {
    if (createInfo.newId === 0) return;
    setSelectedPathId(createInfo.newId);
  }, [createInfo]);

  useEffect(() => {
    async function fetch_setPath() {
      const path: Path = await getPath(selectedPathId!);
      console.log('check emoji', path.isDraft);
      setSelectedPath(path);
      setContentArr(path.draftContentSet);
    }
    fetch_setPath();
    setSaveState('');
  }, [selectedPathId, updateKey, selectedLevel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const code = event.which || event.keyCode;

      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === 's') {
        event.preventDefault();
        saveDraft();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contentArr]);

  return (
    <>
      <Card>
        <div className="flex items-center justify-between p-6 border-b-1">
          <CardTitle>Content Editor</CardTitle>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-[500px] bg-gray-800 text-slate-200 text-left px-4 rounded-md flex items-center justify-between">
                <span>{selectedPath?.name}</span>
                <span>{selectedPath?.isDraft ? ' ❌' : ' ✔'}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[500px] bg-gray-800 text-slate-200">
                <DropdownMenuLabel>Paths</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  onValueChange={(pathId: string) => {
                    setSelectedPathId(parseInt(pathId));
                  }}
                >
                  {paths?.length != 0 &&
                    paths?.map((path: Path) => {
                      return (
                        <DropdownMenuRadioItem
                          className="w-100 flex items-center justify-between px-2"
                          value={path.id.toString()}
                          key={path.id}
                        >
                          <span>{path.name}</span>{' '}
                          <span>{path.isDraft ? ' ❌' : ' ✔'}</span>
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={saveDraft} className="bg-gray-800">
              Save As Draft
            </Button>
            {/* <Button className="bg-gray-800">Delete/Trash</Button> */}
          </div>
        </div>
        <CardContent className="pt-6">
          <Tabs defaultValue="edit" className="flex gap-4">
            <div className="w-[80%]">
              {contentArr ? (
                <TabsContent value="edit">
                  <TipTapEditor
                    editorContent={
                      contentArr?.find(
                        (content) => content.level === selectedLevel
                      )!
                    }
                    setContentArr={setContentArr}
                    saveState={saveState}
                    setSaveState={setSaveState}
                  />
                </TabsContent>
              ) : (
                <div className="w-full text-center">
                  <Spinner label="Loading..." color="warning" />
                </div>
              )}
              <TabsContent value="preview">
                <Parser
                  pathName={selectedPath?.name}
                  fourYearPlan={fourYearPlan}
                  currentTab={selectedLevel}
                  editorContent={
                    contentArr?.find(
                      (content) => content.level === selectedLevel
                    )?.rtf
                  }
                />
              </TabsContent>
              <TabsContent value="publish">
                <div className="text-center">
                  <h2>Viewing in publish mode</h2>
                  <h3 className="text-lg text-gray-500 font-normal mb-2">
                    If the publish tab did not open please click on the button
                    below to see the publish view.
                  </h3>
                  <Link
                    href={`./publish/${params.id}?pathId=${selectedPathId}&level=${selectedLevel}`}
                    target="_blank"
                  >
                    <Button>Publish View</Button>
                  </Link>
                </div>
              </TabsContent>
            </div>
            <div className="w-[20%] flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mode
                </span>
                <TabsList className="grid grid-cols-3 bg-gray-800 text-slate-300">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <Link
                    href={`./publish/${params.id}?pathId=${selectedPathId}&level=${selectedLevel}`}
                    target="_blank"
                  >
                    <TabsTrigger className="w-[100%]" value="publish">
                      Publish
                    </TabsTrigger>
                  </Link>
                </TabsList>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Stage/Level
                </span>
                <Select
                  onValueChange={(level: string) => {
                    setSelectedLevel(level);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Early in the major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Stages/Levels</SelectLabel>
                      <SelectItem className="capitalize" value="early">
                        Early in the major
                      </SelectItem>
                      <SelectItem className="capitalize" value="mid">
                        Mid-Major
                      </SelectItem>
                      <SelectItem className="capitalize" value="late">
                        Late In The Major
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}

export default PathsContentComponent;
