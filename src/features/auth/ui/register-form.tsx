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
import { useRegister } from "../model/use-register";

const registerFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Email обязателен",
      })
      .email("Введите корректный email"),
    password: z
      .string({
        required_error: "Пароль обязателен",
      })
      .min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;
type FormConfig = {
  name: keyof RegisterFormData;
  label: string;
  placeholder?: string;
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
  {
    name: "confirmPassword",
    label: "Подтвердите пароль",
    type: "password",
  },
];

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const { register, isPending, errorMessage } = useRegister();

  const onSubmit = form.handleSubmit(register);

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
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}
