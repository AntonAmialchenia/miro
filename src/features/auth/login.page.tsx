import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в аккаунт"
      description="Введите ваш email и пароль для входа в аккаунт"
      footerText={
        <>
          Нет аккаунта?{" "}
          <Link to={ROUTES.REGISTER} className="text-blue-500">
            Зарегистрироваться
          </Link>
        </>
      }
      form={<LoginForm />}
    />
  );
}

export const Component = LoginPage;
