import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { useModal } from '@context/modals-context';
import { Button } from '@ui/button';

type ModalButton = {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost';
};

type ModalProps = {
  title: string;
  body: React.ReactNode;
  actions?: {
    confirmButton?: ModalButton;
    cancelButton?: ModalButton;
  };
};

const Modal: React.FC<ModalProps> = ({ title, body, actions }) => {
  const { isOpen, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const dropdownOpened = document.querySelector(
      '[data-radix-popper-content-wrapper]'
    );

    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !dropdownOpened?.contains(e.target as Node)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
      />

      <div
        ref={modalRef}
        className="max-h-[85vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative z-10"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-8 pb-6 border-b border-gray-200">
          {title}
        </h2>

        <div
          className={clsx('text-sm text-gray-600 dark:text-gray-300', {
            'mb-6': actions,
          })}
        >
          {body}
        </div>

        <div className="flex justify-end space-x-3">
          {actions?.cancelButton && (
            <Button
              variant={actions.cancelButton.variant || 'outline'}
              onClick={actions.cancelButton.onClick}
            >
              {actions.cancelButton.label || 'Cancel'}
            </Button>
          )}

          {actions?.confirmButton && (
            <Button
              variant={actions.confirmButton.variant || 'destructive'}
              onClick={actions.confirmButton.onClick}
            >
              {actions.confirmButton.label || 'Confirm'}
            </Button>
          )}
        </div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(Modal);
