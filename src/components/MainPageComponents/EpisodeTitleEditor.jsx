import useTabStore from "@/store/useTabStore";
import TitleInput_mini from "../FormComponents/TitleInput_mini";

const EpisodeTitleEditor = ({ control, errors, title, disabled }) => {
  const { tabs, selectedTab } = useTabStore();

  const currentTab = tabs.find((t) => t.tab_id === selectedTab?.tab_id);

  // if (!currentTab) return <div>탭이 선택되지 않았습니다.</div>;

  return (
    <>
      <TitleInput_mini
        control={control}
        error={errors.content}
        title={title}
        disabled={disabled}
      />
    </>
  );
};

export default EpisodeTitleEditor;



