'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import TipTapMenuBar from './menu-bar';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Content } from '@/app/(types)/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { updateDraft } from '@/lib/utils';
import Parser from './parser';
import { useEffect } from 'react';

function TipTapEditor({
  editorContent,
  setContentArr,
  saveState,
  setSaveState,
}: {
  editorContent: Content;
  setContentArr: Dispatch<SetStateAction<Content[] | null | undefined>>;
  saveState: string;
  setSaveState: Dispatch<SetStateAction<string>>;
}) {
  // console.log(editorContent);
  const [editorState, setEditorState] = useState(editorContent);
  // console.log(editorState);

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorContent?.rtf,
    onUpdate: ({ editor }) => {
      setContentArr((prev: Content[] | null | undefined) => {
        return prev?.map((content) => {
          if (content.level === editorContent.level) {
            return { ...content, rtf: editor.getHTML() };
          }
          return content;
        });
      });
      setSaveState('●');
    },
    editorProps: {
      attributes: {
        class:
          'px-6 py-4 max-h-[40rem] min-h-[20rem] focus:border-0 overflow-y-scroll',
      },
    },
  });

  useEffect(() => {
    // if level or path changed?
    if (
      editorState.level !== editorContent.level ||
      editorState.pathId != editorContent.pathId
    ) {
      setEditorState(editorContent);
      editor?.commands.setContent(editorContent.rtf);
    }
  }, [editorContent]);

  return (
    <section className="bg-white rounded-b-lg">
      {editor && <TipTapMenuBar saveState={saveState} editor={editor} />}
      <div className="border-3 border-gray-800">
        <EditorContent editor={editor} />
      </div>
      <div className="text-sm bg-white p-4 rounded-b-lg border-t-0 border-3 border-gray-800 flex items-center justify-between">
        <div>
          Tip: Press{' '}
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-300 border border-gray-400 rounded-lg">
            Ctrl + S
          </kbd>{' '}
          to save as draft
        </div>
        {/* <div className="flex items-center gap-4">
          <Button
            onClick={saveContent}
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Save
          </Button>
          <Button className="bg-slate-800">Cancel</Button>
        </div> */}
      </div>
    </section>
  );
}

export default TipTapEditor;
