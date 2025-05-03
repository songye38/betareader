import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import useEpisodeForm from '@/hooks/useEpisode';
import useTabStore from '@/store/useTabStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import './ManuItem.css'; // css 파일 임포트

dayjs.extend(relativeTime);
dayjs.locale('ko');

const ManuItem = ({ title, lastEditedAt, episodeCount, userId, ManuId }) => {
  const { fetchEpisodesByManuId } = useEpisodeForm();
  const router = useRouter();
  const relativeTimeDisplay = dayjs(lastEditedAt).fromNow();
  const { setTabs, resetTabs } = useTabStore();
  const setManuscript = useManuscriptStore((state) => state.setManuscript);

  const handleClick = async () => {
    if (!(userId && ManuId)) {
      console.error('필수 파라미터가 부족합니다.', { userId, ManuId });
      return;
    }

    const episodes = await fetchEpisodesByManuId(userId, ManuId);
    resetTabs();
    setManuscript({ id: ManuId });
    setTabs(episodes, null);
    const selectedTab = useTabStore.getState().selectedTab;
    if (selectedTab.tab_id) {
      router.push(`/manu/${ManuId}?tab=${selectedTab.tab_id}`);
    } else {
      console.error('selectedTab.tab_id is missing');
    }
  };

  return (
    <div className="manu-item" onClick={handleClick}>
      <div className="manu-item-inner">
        <div className="manu-item-title-box">
          <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
          <div className="manu-item-title">{title}</div>
        </div>
        <div className="manu-item-info-box">
          <div className="manu-item-episode-count">{episodeCount}개의 원고지</div>
          <div className="manu-item-dot" />
          <div className="manu-item-time">{relativeTimeDisplay}</div>
        </div>
      </div>
    </div>
  );
};

export default ManuItem;
