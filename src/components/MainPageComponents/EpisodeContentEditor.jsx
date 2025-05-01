import useTabStore from "@/store/useTabStore";
import ContentInput from "@/components/WritingPageComponents/ContentInput";

const EpisodeContentEditor = ({ control, errors, disabled,onContentChange }) => {

  return (
    <>
      <ContentInput
        control={control}
        error={errors.content}
        disabled={disabled}
        onChangeDetected={onContentChange}

      />
    </>
  );
};

export default EpisodeContentEditor;
