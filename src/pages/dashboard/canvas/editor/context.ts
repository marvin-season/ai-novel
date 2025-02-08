import { PageEditor } from '@blocksuite/presets';
import { DocCollection } from '@blocksuite/store';
import { createContext, useContext } from 'react';

export const EditorContext = createContext<{
  editor: PageEditor;
} | null>(null);

export function useEditor() {
  return useContext(EditorContext);
}
