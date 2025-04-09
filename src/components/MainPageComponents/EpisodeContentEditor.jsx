import useTabStore from "@/store/useTabStore";
import ContentInput from "@/components/WritingPageComponents/ContentInput";

const EpisodeContentEditor = ({ control, errors }) => {
  const { tabs, selectedTab } = useTabStore();
  const currentTab = tabs.find((t) => t.id === selectedTab?.id);

  if (!currentTab) return <div>탭이 선택되지 않았습니다.</div>;

  return (
    <>
      <ContentInput
        control={control}
        error={errors.content}
      />
    </>
  );
};

export default EpisodeContentEditor;
