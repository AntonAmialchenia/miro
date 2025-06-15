import { Button } from "@/shared/ui/kit/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/use-login";

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email обязателен",
    })
    .email("Введите корректный email"),
  password: z
    .string({
      required_error: "Password обязателен",
    })
    .min(6, "Пароль должен быть не менее 6 символов"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;
type FormConfig = {
  name: keyof LoginFormData;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

const formConfig: FormConfig[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "admin@gmail.com",
  },
  {
    name: "password",
    label: "Пароль",
    placeholder: "••••••••",
    type: "password",
  },
];

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const { login, isPending, errorMessage } = useLogin();

  const onSubmit = form.handleSubmit(login);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {formConfig.map(({ name, label, placeholder, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    type={type || "text"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
        <Button disabled={isPending} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
