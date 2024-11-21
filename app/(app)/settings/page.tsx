import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AccountWindow, NotificationWindow, ProfileWindow} from "@/components/windows";

export default function Settings() {

  return (
    <>
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <div className={"mt-4"}>
          <TabsContent value="notifications">
            <NotificationWindow />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileWindow />
          </TabsContent>
          <TabsContent value="account">
            <AccountWindow />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
} 