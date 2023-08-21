'use client';

import { useStoreModal } from '@/hooks/use-store.modal';
import { Modal } from '@/components/Modal';

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="create the new store to manage the products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form
    </Modal>
  );
};
