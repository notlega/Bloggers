import PropTypes from 'prop-types';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialConfig: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  CustomAutoFocusPlugin: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

/**
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const RichTextEditor = ({ initialConfig, onChange, CustomAutoFocusPlugin, placeholder }) => (
  <LexicalComposer initialConfig={initialConfig}>
    <PlainTextPlugin
      contentEditable={<ContentEditable />}
      placeholder={<div>{placeholder}</div>}
      ErrorBoundary={LexicalErrorBoundary}
    />
    <OnChangePlugin onChange={onChange} />
    <HistoryPlugin />
    <CustomAutoFocusPlugin />
  </LexicalComposer>
);

RichTextEditor.propTypes = propTypes;

export default RichTextEditor;
