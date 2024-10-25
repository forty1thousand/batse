import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type ModalProps = React.PropsWithChildren<{
  open: boolean;
  closeModal(..._: unknown[]): void;
  className?: string | undefined;
}>;

export function Modal({ open, closeModal, children, className }: ModalProps) {
  return (
    <Transition appear show={open ?? false}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeModal(false)}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 dark:bg-white/5 backdrop-blur" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={twMerge(
                  "rounded-lg p-8 bg-background shadow-xl transition-all",
                  className
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

type DrawerProps = ModalProps;

export function Drawer({ open, closeModal, children, className }: DrawerProps) {
  return (
    <Transition appear show={open ?? false}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeModal(false)}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 dark:bg-white/5 backdrop-blur" />
        </TransitionChild>
        <div className="fixed left-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={twMerge(
                  "rounded-lg p-8 bg-background shadow-xl transition-all",
                  className
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
