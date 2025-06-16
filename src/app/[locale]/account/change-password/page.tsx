"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserSession } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IconMark } from "@/components/icons";
import { dataSidebar } from "../sidebar";
import { usePathname, useRouter } from "next/navigation";
import { InputPassWord } from "@/components/Form/input-password";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export interface IChangePasswordProps {}

const formSchema: any = z
  .object({
    old_password: z.string(),
    new_password: z.string().nonempty("This value is required.").min(3),
    confirm_new_password: z.string(),
  })
  .refine(
    (values) => {
      return values.new_password === values.confirm_new_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirm_new_password"],
    },
  );
export default function ChangePassword(props: IChangePasswordProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const axiosApi = useAxiosAuth();
  let user = session && (session.user as UserSession | null);
  let token = user && user.access_token;
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
  };

  return (
    <div
      className={`${
        dataSidebar.findIndex((data) => data.href === pathname.slice(1)) === -1
          ? "hidden "
          : ""
      } w-full lg:block lg:w-3/4`}
    >
      <div
        className="flex justify-end lg:hidden"
        onClick={() => router.push(`/account`)}
      >
        <IconMark />
      </div>
      <h2 className="mb-5 text-xl font-semibold">Change Password</h2>
      <div className="flex flex-col gap-5 rounded-lg border border-slate-300 p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <InputPassWord
                        type="password"
                        placeholder="Enter your Old Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            /> */}
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <InputPassWord
                        placeholder="Enter your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_new_password"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputPassWord
                        placeholder="Enter your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
              className="text-base font-bold text-white"
            >
              Save
            </Button>
            {error && <p className="font-medium text-red-500">{error}</p>}{" "}
            {success && <p className="font-medium text-green-500">{success}</p>}{" "}
            {/* Hiển thị thông báo lỗi */}
          </form>
        </Form>
      </div>
    </div>
  );
}
