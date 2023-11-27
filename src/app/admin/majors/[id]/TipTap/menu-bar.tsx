import { Button } from '@nextui-org/react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Pilcrow,
} from 'lucide-react';

const bg_active = 'bg-[#67676769]';
const TipTapMenuBar = ({
  saveState,
  editor,
}: {
  saveState: string;
  editor: Editor;
}) => {
  return (
    <div className="flex justify-between bg-gray-800 text-white w-100 mb-0 p-2 rounded-t-lg">
      <div className="flex flex-wrap gap-4  child:p-1 child:rounded-sm">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? `is-active ${bg_active}` : ''}
        >
          <Bold className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? `is-active ${bg_active}` : ''}
        >
          <Italic className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? `is-active ${bg_active}` : ''}
        >
          <Strikethrough className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <Pilcrow />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 })
              ? `is-active ${bg_active}`
              : ''
          }
        >
          <Heading1 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 })
              ? `is-active ${bg_active}`
              : ''
          }
        >
          <Heading2 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 })
              ? `is-active ${bg_active}`
              : ''
          }
        >
          <Heading3 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 })
              ? `is-active ${bg_active}`
              : ''
          }
        >
          <Heading4 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 })
              ? `is-active ${bg_active}`
              : ''
          }
        >
          <Heading5 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 })
              ? `is-active ${bg_active}`
              : ''
          }
        >
          <Heading6 className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive('bulletList') ? `is-active ${bg_active}` : ''
          }
        >
          <List className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive('orderedList') ? `is-active ${bg_active}` : ''
          }
        >
          <ListOrdered className="w-6 h-6" />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive('codeBlock') ? `is-active ${bg_active}` : ''
          }
        >
          <CodepenIcon className="w-6 h-6" />
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive('blockquote') ? `is-active ${bg_active}` : ''
          }
        >
          <Quote className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="w-6 h-6" />
        </button>
      </div>
      <span className="text-gray-300 px-2">{saveState}</span>
    </div>
  );
};

export default TipTapMenuBar;
