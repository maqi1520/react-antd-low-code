import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../../components/editor'), {
  ssr: false,
  loading: () => <div className="loader"></div>,
});

export default function EditorPage() {
  return <Editor />;
}
