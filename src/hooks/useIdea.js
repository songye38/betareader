import useIdea from '@/hooks/useIdea';
import useAuthStore from '@/store/useAuthStore';

const AddIdeaModal = ({ onClose, onSubmit }) => {
  const { createNewIdea, loading, error } = useIdea();
  const user = useAuthStore((state) => state.user);

  const onSubmitForm = async (formData) => {
    const newIdea = {
      title: formData.title,
      category: formData.dropdown,
      description: formData.episode,
      tags: formData.newKeywords || [],
    };

    try {
      const result = await createNewIdea(newIdea, user.id);
      onSubmit?.(result);
      onClose?.();
    } catch (err) {
      alert(err.message);
    }
  };

  // ...
};
