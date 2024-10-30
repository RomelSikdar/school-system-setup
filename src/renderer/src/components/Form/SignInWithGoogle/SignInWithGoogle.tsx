import { Button } from "@renderer/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface SignInWithGoogleProps {
  label?: string;
  showContinueText?: boolean;
}

export default function SignInWithGoogle({
  label = "Sign In with Google",
  showContinueText = false,
}: SignInWithGoogleProps) {
  return (
    <>
      {showContinueText && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </>
      )}
      <Button variant="outline" className="w-full">
        <FcGoogle
          className="mr-2 w-4 h-4"
          style={{ width: "1.3rem", height: "1.3rem" }}
        />
        {label}
      </Button>
    </>
  );
}
