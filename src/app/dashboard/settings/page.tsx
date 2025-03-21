"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProfileTab from "@/components/settings/profile-tab";
import NotificationsTab from "@/components/settings/notifications-tab";
import AccountTab from "@/components/settings/account-tab";
import { useTitle } from "@/contexts/title-context";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("notifications");
  const { setTitle } = useTitle();

  const handleValueChange = (value: string) => {
    setActiveTab(value);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationsTab />;
      case "profile":
        return <ProfileTab />;
      case "account":
        return <AccountTab />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setTitle({ title: "Settings" });
  }, [setTitle]);

  return (
    <div className="w-full">
      <div className="md:hidden mb-4">
        <Select onValueChange={handleValueChange} value={activeTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="notifications">Notifications</SelectItem>
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="account">Account</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:block mb-4">
        <Tabs value={activeTab} onValueChange={handleValueChange}>
          <TabsList className="">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
