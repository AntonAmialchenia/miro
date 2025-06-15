import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации"
      footerText={
        <>
          Уже есть аккаунт?{" "}
          <Link to={ROUTES.LOGIN} className="text-blue-500">
            Войти
          </Link>
        </>
      }
      form={<RegisterForm />}
    />
  );
}

export const Component = RegisterPage;
