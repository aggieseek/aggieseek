import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProfileTab from "@/components/settings/profile-tab";
import NotificationsTab from "@/components/settings/notifications-tab";
import AccountTab from "@/components/settings/account-tab";

export default function Settings() {

  return (
    <>
      <Tabs defaultValue="notifications" className="">
        <TabsList className="">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <div className={"mt-4"}>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
} 