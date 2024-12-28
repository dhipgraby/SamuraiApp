"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VendorsConfigSchema, VendorsConfig } from "@/schemas/zod/user-zod-schema";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Alert from "@/components/ui/alert";
import { useUserSettingsMutation } from "@/queries/user/profile-query";
import { toast } from "sonner";
import { saveSettings } from "@/lib/actions/save-settings";
import { useSession } from "@/hooks/useSession";
import { UserRoles } from "@/types/user-types";
import SelectDialCode from "../verify-kyc/select-dial-code";

const UserSettings = ({ user, userSettings }: { user: any, userSettings: any }) => {

  const { retrieveAccessToken } = useSession();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<VendorsConfig>({
    resolver: zodResolver(VendorsConfigSchema),
    defaultValues: {
      email: userSettings?.email || "",
      phoneNumber: userSettings?.phoneNumber || "",
      phoneDialCode: userSettings?.phoneDialCode || "",
      feeRate: user?.rol === UserRoles.BUSINESS ? userSettings?.feeRate : undefined,
      isTwoFactorEnabled: userSettings?.isTwoFactorEnabled || false,
      isTwoFactorSmsEnabled: userSettings?.isTwoFactorSmsEnabled || false
    }
  });

  const { submitSettingsMutation } = useUserSettingsMutation();

  const onSubmit = async (values: VendorsConfig) => {
    if (values.feeRate) values.feeRate = Number(values.feeRate);

    const accessToken = retrieveAccessToken();
    const creating = await submitSettingsMutation.mutateAsync({
      setIsLoading,
      setErrorMsg,
      serverAction: async () => await saveSettings(values, accessToken)
    });

    if (creating.serverResponse.status && creating.serverResponse.status === 200) {
      setSuccess(creating.serverResponse.message);
      toast.success("User settings saved successfully");
    }
  };

  if (!user) return <h1>User not found</h1>;
  if (user?.rol !== UserRoles.INDIVIDUAL && user?.rol !== UserRoles.BUSINESS) return <Alert className="w-fit" message={"Complete one of the KYC or KYB formularies in dashboard to access settings."} type="info" />;

  return (
    <div className="w-full mt-5 max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <SelectDialCode
              form={form}
              fieldName="phoneDialCode"
              fieldLabel="Dial code"
              initialDialCode={userSettings?.phoneDialCode}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-11/12">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {user.rol === UserRoles.BUSINESS && (
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="feeRate"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Fee Rate % (example 1%) - Max 99%</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="font-bold ml-2 mt-4">%</p>
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Two Factor Email</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isTwoFactorSmsEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Two Factor SMS</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit btn */}
          {errorMsg && <Alert message={errorMsg} type="error" />}
          {success && <Alert message={success} type="success" />}
          <Button disabled={isLoading} type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserSettings;
