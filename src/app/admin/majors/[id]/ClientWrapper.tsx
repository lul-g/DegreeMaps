'use client';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import ClientModal from './ClientModal';
import PathsContentComponent from './PathsContentComp';
import { CreateInfoType, Major, Path } from '@/app/(types)/types';
import { create } from 'domain';

function ClientWrapper({ major, id }: { major: Major; id: number }) {
  const [createInfo, setCreateInfo] = useState<CreateInfoType>({
    isLoading: false,
    isError: false,
    newId: 0,
  });
  const [selectedPathId, setSelectedPathId] = React.useState<number | null>(
    major.paths?.length ? major.paths[0].id : null
  );
  const [selectedPath, setSelectedPath] = React.useState<Path | null>(
    major.paths?.length ? major.paths[0] : null
  );
  const [updateKey, setUpdateKey] = useState(false);
  return (
    <>
      <CardHeader className="p-0 mt-5 mb-10">
        <CardTitle className="text-5xl font-bold">{major.majorTxt}</CardTitle>
        <CardDescription className="text-lg">
          {major.collegeTxt}
        </CardDescription>
        <div className="flex gap-2 mt-[20px!important]">
          <ClientModal
            setSelectedPathId={setSelectedPathId}
            createInfo={createInfo}
            setCreateInfo={setCreateInfo}
            majorId={id}
            selectedPath={selectedPath}
            updateKey={updateKey}
            setUpdateKey={setUpdateKey}
          />
        </div>
      </CardHeader>
      <PathsContentComponent
        createInfo={createInfo}
        fourYearPlan={major.fourYearPlan}
        paths={major.paths}
        selectedPathId={selectedPathId}
        setSelectedPathId={setSelectedPathId}
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        updateKey={updateKey}
      />
    </>
  );
}

export default ClientWrapper;
