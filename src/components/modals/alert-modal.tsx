'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/modals/Modal';
import { Button } from '@/components/ui/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant={'outline'}
          onClick={onClose}
          type="button"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant={'destructive'}
          onClick={onConfirm}
          type="button"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}