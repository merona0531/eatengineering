import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef } from 'react';

const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), { ssr: false });

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

export default function TuiEditor({ content, imageHandler }) {
    const editorRef = useRef(null);

    return (
        <div>
            <Editor
                initialValue={content ?? ' '}
                initialEditType='wysiwyg'
                autofocus={false}
                ref={editorRef}
                toolbarItems={toolbar}
                hideModeSwitch
                height='500px'
                hooks={{ addImageBlobHook: imageHandler }}
            />
        </div>
    );
}
