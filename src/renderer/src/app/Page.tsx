import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@renderer/components/ui/tabs";
import LoginFrom from "@renderer/components/Form/LoginFrom/LoginFrom";
import SignUpFrom from "@renderer/components/Form/SignUpFrom/SignUpFrom";

export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Tabs defaultValue="signIn" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">Login</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <LoginFrom />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpFrom />
        </TabsContent>
      </Tabs>
    </div>
  );
}
