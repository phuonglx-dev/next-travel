import { Link } from "@/navigation";
import ForgotPasswordSteps from "@/components/forgot-password/forgot-password-with-email";
import { useTranslations } from "next-intl";
import NextIntlProvider from "@/components/providers/NextIntlProvider";

export interface IForgotPasswordProps { }

export default function ForgotPasswordDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: any;
}) {
  const callback = searchParams?.callback || null;
  const t = useTranslations("account");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg">
        <NextIntlProvider>
          <ForgotPasswordSteps callback={callback} />
        </NextIntlProvider>
        <div className="text-center text-gray-600 dark:text-gray-400">
          <div>
            {t("already_account")}{" "}
            {callback ? (
              <Link
                href={`/login?callback=${callback}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {t("login")}
              </Link>
            ) : (
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {t("login")}
              </Link>
            )}
          </div>
          <div className="mt-4 text-sm">
            {t("agree_account")}{" "}
            <Link
              href="/single/terms-and-conditions"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t("terms_and_conditions")}
            </Link>
            ,{" "}
            <Link
              href="/single/privacy-policies"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t("privacy_policy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
