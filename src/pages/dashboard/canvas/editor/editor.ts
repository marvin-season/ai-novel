import { createEmptyDoc, PageEditor } from '@blocksuite/presets';
import '@blocksuite/presets/themes/affine.css';

export function initEditor() {
  const doc = createEmptyDoc().init();
  const editor = new PageEditor();
  editor.doc = doc;
  return { editor };
}
