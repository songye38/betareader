import useTabStore from "@/store/useTabStore";
import TitleInput_mini from "../FormComponents/TitleInput_mini";

const EpisodeTitleEditor = ({ control, errors, title, disabled,onTitleChange }) => {

  return (
    <>
      <TitleInput_mini
        control={control}
        error={errors.content}
        title={title}
        disabled={disabled}
        onChangeDetected={onTitleChange}
      />
    </>
  );
};

export default EpisodeTitleEditor;



