'use client';
import React from 'react';
import { Major, Path } from '@/app/(types)/types';
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
  pathId,
  level,
  major,
}: {
  paths: Path[];
  pathId: string | null;
  level: string | null;
  major: Major;
}) {
  const [selectedPathId, setSelectedPathId] = React.useState(pathId!);
  const [selectedPath, setSelectedPath] = React.useState<Path | null>();

  function handleChange(pathId: string) {
    console.log(`handleChange| current path: ${pathId}`);
    setSelectedPathId(pathId);
  }

  React.useEffect(() => {
    async function fetch_setPath() {
      const path = await getPath(parseInt(selectedPathId));
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
            disabled={true}
            onValueChange={(pathId: string) => {
              handleChange(pathId);
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
            path={selectedPath}
            draftContentSet={selectedPath.draftContentSet}
            name={selectedPath.name}
            major={major}
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
