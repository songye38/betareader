import useTabStore from "@/store/useTabStore";
import ContentInput from "@/components/WritingPageComponents/ContentInput";

const EpisodeContentEditor = ({ control, errors, disabled }) => {

  return (
    <>
      <ContentInput
        control={control}
        error={errors.content}
        disabled={disabled}

      />
    </>
  );
};

export default EpisodeContentEditor;
