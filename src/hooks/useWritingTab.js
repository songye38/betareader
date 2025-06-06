import { useRouter } from "next/router";
import useTabStore from "@/store/useTabStore"; // Zustand 사용
import useManuscriptStore from "@/store/useManuscriptStore";
import useAuthStore from "@/store/useAuthStore";
import { useEffect,useState } from "react";

const useWritingTab = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const {
    resetSelectedTab,
    addTab,
    setSelectedTab,
    currentManuscriptId,
    incrementManuscriptId,
    selectedTab,
    tabs,
    updateTab,

  } = useTabStore();
  const { manuscript } = useManuscriptStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (manuscript) {
      setIsLoading(false);
    }
  }, [manuscript]);

  const handleAddTab = (manuscriptId) => {
    const newTabId = Date.now();
    const newEpisodeId = currentManuscriptId;

    const newTab = {
      id: '',
      tab_id: newTabId,
      tab_no: newEpisodeId,
      created_at: new Date().toISOString(),
      last_edited_at: new Date().toISOString(),
      manuscript_id: manuscriptId,
      EpisodeId: newEpisodeId,
      selected: true,
      title: '무제',
      content: '',
      status: '작성중',
    };

    addTab(newTab);

    if (newTabId !== selectedTab.id) {
      setSelectedTab(newTabId, newEpisodeId);
    }


    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: newTabId },
    });

    incrementManuscriptId();
  };

  const handleTabChange = (tabId) => {
    const selected = tabs.find((tab) => tab.tab_id === tabId);
    if (!selected) return;
    setSelectedTab(selected.tab_id, selected.tab_no, selected.id);  // 탭 클릭 시 해당 탭으로 상태 변경

    // 탭 클릭 시 URL을 변경하여 탭 정보를 반영
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: tabId },  // 기존 URL 쿼리 파라미터에 tab 추가
    });
  };

  const handleTitleClick = () => {
    if (user?.id && manuscript?.id) {
      resetSelectedTab();
      router.push(`/${user.id}/${manuscript.id}`);
    }
  };

  const handleUpdateTab = (tabId, updatedFields) => {
    if (!tabId) return;
    updateTab(tabId, updatedFields);
  };

  // ✅ 외부에서 사용하기 위해 필요한 값과 함수 return
  return {
    isLoading,
    handleAddTab,
    handleTitleClick,
    handleTabChange,
    handleUpdateTab,
  };
};

export default useWritingTab;
