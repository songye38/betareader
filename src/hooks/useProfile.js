import { useState } from 'react';
import { updateProfileGoals, getProfileGoals } from '@/models/profileModel';

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [goals, setGoals] = useState(null); // 불러온 goals 저장용

  // ✅ goals 업데이트 함수
  async function updateGoals(userId, newGoals) {
    setLoading(true);
    setError(null);

    try {
      const result = await updateProfileGoals(userId, newGoals);
      setGoals(result.goals);
      return result;
    } catch (err) {
      console.error('Failed to update goals:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  // ✅ goals 가져오기 함수
  async function fetchGoals(userId) {
    setLoading(true);
    setError(null);

    try {
      const fetchedGoals = await getProfileGoals(userId);
      setGoals(fetchedGoals);
      return fetchedGoals;
    } catch (err) {
      console.error('Failed to fetch goals:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    goals,
    loading,
    error,
    updateGoals,
    fetchGoals
  };
}
