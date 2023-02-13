import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { MdArrowBack } from 'react-icons/md';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { $getRoot, $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import RichTextEditorTheme from '../themes/RichTextEditorTheme';
import RichTextEditor from '../components/richTextEditor/RichTextEditor';

const NewBlog = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  // TODO: OPTIMISE THIS FS
  const [blogText, setBlogText] = useState('');

  const onChange = (editorState) => {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log('🚀 ~ file: lexical.jsx:20 ~ editorState.read ~ root', root);
      console.log('🚀 ~ file: lexical.jsx:21 ~ editorState.read ~ selection', selection);

      // eslint-disable-next-line no-underscore-dangle
      setBlogText(root.__cachedText);
    });
  };

  const MyCustomAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // Focus the editor when the effect fires!
      editor.focus();
    }, [editor]);

    return null;
  };

  const onError = (error) => {
    console.log('🚀 ~ file: lexical.jsx:37 ~ onError ~ error', error);
  };

  const submitNewBlogHandler = async (name, description) => {
    const { data, error } = await supabaseClient.rpc('create_blog', {
      _name: name,
      _description: description,
      _blog: blogText,
      _user_id: user.id,
    });

    if (error) {
      console.log('🚀 ~ file: lexical.jsx:47 ~ submitNewBlogHandler ~ error', error);
      return;
    }

    router.push(`/blog/${data}`);
  };

  const initialConfig = {
    namespace: 'MyEditor',
    theme: RichTextEditorTheme,
    onError,
  };

  return (
    <div className="flex flex-col text-center justify-center space-y-8 w-full">
      <button className="btn btn-ghost absolute top-6 left-4 !m-0" onClick={() => router.back()}>
        <MdArrowBack className="w-8 h-8" />
      </button>
      <h1 className="text-5xl font-bold w-full !mt-20">New Blog</h1>
      <Formik
        initialValues={{ name: '', description: '' }}
        validate={() => {}}
        onSubmit={(values, { setSubmitting }) => {
          submitNewBlogHandler(values.name, values.description);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form
            className="form-control justify-center space-y-4 w-full md:w-1/2 md:mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Name of blog..."
              className="input input-bordered"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <input
              type="text"
              name="description"
              placeholder="Description of blog..."
              className="input input-bordered"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {errors.description && touched.description && errors.description}
            <RichTextEditor
              initialConfig={initialConfig}
              onChange={onChange}
              CustomAutoFocusPlugin={MyCustomAutoFocusPlugin}
              placeholder="Enter blog..."
            />
            <button type="submit" disabled={isSubmitting} className="btn w-full">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

NewBlog.getLayout = (page) => (
  <div className="px-2 md:px-6 lg:mx-auto lg:max-w-[1080px]">{page}</div>
);

export default NewBlog;
