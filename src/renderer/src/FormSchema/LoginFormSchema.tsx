import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, z } from "zod";

const LoginFormSchema = object({
  email: string({ required_error: "email is required" }).email(),
  password: string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be upto 64 characters")
    .regex(
      new RegExp("^(?=.*?[a-z]).*"),
      "Password must consist a lowercase letter.",
    )
    .regex(
      new RegExp("^(?=.*?[A-Z]).*"),
      "Password must consist a uppercase letter.",
    )
    .regex(new RegExp("^(?=.*?[0-9]).*"), "Password must consist a number.")
    .regex(
      new RegExp("^(?=.*?[#?!@$%^&*-]).*"),
      "Password must consist a special character.",
    ),
});

export default LoginFormSchema;

export const useLoginFormSchema = (
  defaultValues: z.infer<typeof LoginFormSchema>,
) =>
  useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });
