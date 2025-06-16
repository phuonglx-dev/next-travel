import { NextAuthProvider } from "@/components/providers";
import { authOptions } from "@/util/authOptions";
import { getServerSession } from "next-auth";
import ClientLoginWrapper from "./ClientLoginWrapper";
import { notFound, redirect } from "next/navigation";

const SignInPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  //   const session = await getServerSession(authOptions);
  return notFound();
  // if (code === "facebook" || code === "google" || code === "close") {
  //   return (
  //     <div className="">
  //       <NextAuthProvider>
  //         <ClientLoginWrapper method={code} />
  //       </NextAuthProvider>
  //     </div>
  //   );
  // }
};

export default SignInPage;
