'use client';
import React from 'react';
import { Path } from '@/app/(types)/types';
import ContentArea from './ContentArea';
import { Spinner } from '@nextui-org/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getPath } from '@/lib/utils';

function PathsContentComponent({
  paths,
  fourYearPlan,
}: {
  paths: Path[];
  fourYearPlan: string;
}) {
  const [selectedPathId, setSelectedPathId] = React.useState<number>(
    paths[0].id
  );
  const [selectedPath, setSelectedPath] = React.useState<Path | null>(paths[0]);

  function handleChange(pathId: number) {
    console.log(`handleChange| current path: ${pathId}`);
    setSelectedPathId(pathId);
  }

  React.useEffect(() => {
    async function fetch_setPath() {
      const path = await getPath(selectedPathId);
      setSelectedPath(path);
    }
    fetch_setPath();
  }, [selectedPathId]);

  return (
    <>
      <span className="text-xl font-bold">Select A Path</span>
      {selectedPath ? (
        <>
          <Select
            onValueChange={(pathId: string) => {
              handleChange(parseInt(pathId));
            }}
          >
            <SelectTrigger className="w-[500px]">
              <SelectValue placeholder={selectedPath!.name} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Paths</SelectLabel>
                {paths.length != 0 &&
                  paths.map((path: Path) => {
                    return (
                      <SelectItem value={`${path.id}`} key={path.id}>
                        {path.name}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ContentArea
            publishContentSet={selectedPath.publishContentSet}
            name={selectedPath.name}
            fourYearPlan={fourYearPlan}
          />
        </>
      ) : (
        <div className="flex items-center justify-center mt-[10rem]">
          <Spinner label="Fetching Content..." color="default" />
        </div>
      )}
    </>
  );
}

export default PathsContentComponent;
