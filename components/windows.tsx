import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import majors from "@/public/data/majors.json";

export function NotificationWindow() {

  return (
    <div className={"flex flex-col gap-y-4"}>
      <Label>Email Addresses</Label>
      <Input />
      <Label>Phone Numbers</Label>
      <Label>Discord Webhooks</Label>
      <Label>Notification Preferences</Label>

    </div>
  );
}

export function ProfileWindow() {

  return (
    <div className={"flex flex-col gap-y-4"}>
      <div className={"w-1/5 space-y-1"}>
        <Label>Username</Label>
        <Input placeholder={"username"}/>
      </div>

      <div className={"w-1/5 space-y-1"}>
        <Label>Class</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="freshman">Freshman</SelectItem>
            <SelectItem value="sophomore">Sophomore</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="graduate">Graduate Student</SelectItem>
            <SelectItem value="postgraduate">Postgraduate</SelectItem>
            <SelectItem value="alumni">Alumni</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

      </div>

      <div className={"w-1/5 space-y-1"}>
        <Label>Major</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select"/>
          </SelectTrigger>
          <SelectContent>
            {majors.map((major, index) => (
              <SelectItem key={index} value={major}>{major}</SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

    </div>
  );
}

export function AccountWindow() {

  return (
    <div className={"flex flex-col gap-y-4"}>
      <Button className={"w-1/6"} variant={"destructive"}>Delete Account</Button>
    </div>
  );
}