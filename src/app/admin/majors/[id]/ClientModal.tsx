'use client';

import { CreateInfoType, Path } from '@/app/(types)/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postPath, updatePath } from '@/lib/utils';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Toggle } from '@/components/ui/toggle';

function ClientModal({
  majorId,
  createInfo,
  setCreateInfo,
  selectedPath,
  setSelectedPathId,
}: {
  majorId: number;
  createInfo: CreateInfoType;
  setCreateInfo: React.Dispatch<React.SetStateAction<CreateInfoType>>;
  selectedPath: Path | null;
  setSelectedPathId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const createRef = useRef<HTMLInputElement>(null);
  const updateRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [isDraft, setIsDraft] = useState(selectedPath?.isDraft);

  async function handleDelete() {
    // const response = await pathDelete(selectedPath?.id);
    console.log('delete: ', selectedPath?.id);
  }
  async function handleUpdate(
    name: string | undefined,
    isDraft: boolean | undefined
  ) {
    if (name === undefined || name === null || name === '') {
      console.log('name is null');
      return;
    }
    console.log('isdraft', isDraft);
    const response = await updatePath({
      ...selectedPath!,
      name: name!,
      isDraft: isDraft!,
      majorId: majorId,
    });
    //toasityf
    console.log(response?.data.pathId);
    setSelectedPathId(response?.data.pathId);
    router.refresh();
  }

  useEffect(() => {
    console.log(clicked);
    if (!clicked) {
      return;
    }
    setCreateInfo((prev) => ({ ...prev, isLoading: true }));

    const placeHolderRtf = `
    <div>
      <h2 class="path">${createRef.current?.value!}</h2>
      <div>
        <h4><i class="fa-solid fa-graduation-cap"></i> Academics</h5>
      </div>
      <div>
        <h4><i class="fa-solid fa-users"></i> Engagment</h5>
      </div>
      <div>
        <h4><i class="fa-solid fa-briefcase"></i> Career Exploration</h5>
      </div>
    </div>
    `;
    const path: Path = {
      id: 0,
      name: createRef.current?.value!,
      isDraft: true,
      draftContentSet: [
        {
          id: 0,
          rtf: placeHolderRtf,
          level: 'early',
          pathId: 0,
        },
        {
          id: 0,
          rtf: placeHolderRtf,
          level: 'mid',
          pathId: 0,
        },
        {
          id: 0,
          rtf: placeHolderRtf,
          level: 'late',
          pathId: 0,
        },
      ],
      publishContentSet: [
        {
          id: 0,
          rtf: placeHolderRtf,
          level: 'early',
          pathId: 0,
        },
        {
          id: 0,
          rtf: placeHolderRtf,
          level: 'mid',
          pathId: 0,
        },
        {
          id: 0,
          rtf: placeHolderRtf,
          level: 'late',
          pathId: 0,
        },
      ],
      majorId: majorId,
    };
    async function _postPath() {
      const response = await postPath(path);
      router.refresh();
      if (response?.status === 200)
        setCreateInfo((prev) => ({
          ...prev,
          isLoading: false,
          newId: response.data.pathId,
        }));
    }
    _postPath();
    setClicked(false);
  }, [clicked]);
  if (createInfo.isError) {
    // toastify
    return <h1>Some error</h1>;
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gray-800" disabled={createInfo.isLoading}>
            Create A New Path{' '}
            {createInfo.isLoading ? <Spinner size="sm" className="ms-2" /> : ''}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Path</DialogTitle>
            <DialogDescription>Please enter the path name.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="createInput" className="sr-only">
                Path Name
              </Label>
              <Input
                ref={createRef}
                id="createInput"
                defaultValue="Application Developer"
              />
            </div>
            <DialogClose asChild>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={() => {
                  setClicked(true);
                }}
              >
                Create
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update Path</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Path</DialogTitle>
            <DialogDescription>Please enter a new path name.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="updateInput" className="sr-only">
                Path Name
              </Label>
              <Input
                ref={updateRef}
                id="updateInput"
                defaultValue={selectedPath?.name}
              />
            </div>
            <DialogClose asChild>
              <Button
                type="button"
                size="sm"
                className="px-3 bg-gray-800 "
                onClick={() => {
                  handleUpdate(updateRef.current?.value, selectedPath?.isDraft);
                }}
              >
                Update
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Toggle
                variant={'outline'}
                type="button"
                className="px-3"
                size="sm"
                onClick={() => {
                  setIsDraft((prevIsDraft) => {
                    const newIsDraft = !prevIsDraft;
                    handleUpdate(updateRef.current?.value, newIsDraft);
                    return newIsDraft;
                  });
                }}
              >
                {isDraft ? 'Publish' : 'Unpublish'}
              </Toggle>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete Path</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              <span className="font-bold">"{selectedPath?.name}"</span> and all
              related content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ClientModal;
