"use client";

import * as React from "react";
import { IconFaceBook, IconGoogle } from "../icons";
import LoadingSpinner from "../loading/loadingSpiner";

export interface ILoginWithEmailProps {
  callback?: string | null;
}

export default function ButtonLogins({ callback }: ILoginWithEmailProps) {
  const [loadingGoogle, setLoadingGoogle] = React.useState(false);
  const [loadingFaceBook, setLoadingFaceBook] = React.useState(false);

  const handleLoginGoogle = async () => {
    // Add your login logic for Google here
  };

  const handleLoginFaceBook = async () => {
    // Add your login logic for Facebook here
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <button
        className="flex w-1/3 cursor-pointer justify-center rounded-lg border border-black px-2 py-3 text-center hover:bg-slate-200"
        aria-label="Log in with Google"
        onClick={handleLoginGoogle}
      >
        {loadingGoogle ? <LoadingSpinner /> : <IconGoogle className="h-6 w-6" />}
      </button>
      <button
        aria-label="Log in with Facebook"
        className="flex w-1/3 cursor-pointer justify-center rounded-lg border border-black px-2 py-3 text-center hover:bg-slate-200"
        onClick={handleLoginFaceBook}
      >
        {loadingFaceBook ? <LoadingSpinner /> : <IconFaceBook className="w-6 h-6 fill-blue-600" />}
      </button>
    </div>
  );
}
