import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

const inactivityDuration: number = 60 * 60 * 1000; // 15 minutes in milliseconds

interface InactivityReloadProps {
  children: React.ReactNode;
}

const InactivityReload: React.FC<InactivityReloadProps> = ({ children }) => {
  let inactivityTimeout: NodeJS.Timeout;
  const [openModal, setOpen] = React.useState<boolean>(false);
  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) window.location.reload();
  };

  const openNotificationWithIcon = () => {
    setOpen(true);
  };

  const resetInactivityTimer = () => {
    // Clear any existing timeout
    clearTimeout(inactivityTimeout);

    // Set a new timeout for the specified inactivity duration
    inactivityTimeout = setTimeout(() => {
      // Reload the page after 30 minutes of inactivity
      openNotificationWithIcon();
    }, inactivityDuration);
  };

  const handleUserActivity = () => {
    // When the user interacts with the page, reset the inactivity timer
    resetInactivityTimer();
  };

  useEffect(() => {
    // Add event listeners for user activity when the component mounts
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    // Initialize the inactivity timer when the component mounts
    resetInactivityTimer();

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  return (
    <>
      {children}
      <Dialog open={openModal} onOpenChange={onOpenChange}>
        {/* <DialogTrigger className={`${classNameTitle}`}>{header}</DialogTrigger> */}
        {/* max-w-full max-h-full inset-0 translate-x-0 translate-y-0 */}
        <DialogContent
          className={`top-0 sm:max-h-full sm:max-w-full md:h-auto md:w-[500px]`}
        >
          <DialogHeader>
            <DialogTitle className="mb-2">Session expired</DialogTitle>
            <div>
              Your current booking session has expired. Please click the button
              below or refresh the page.
            </div>
            <Button
              type="submit"
              onClick={() => window.location.reload()}
              className="w-full text-base font-bold text-white outline-hidden"
            >
              Refresh Page
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InactivityReload;
