import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <main className="grow flex flex-col pt-[200px] justify-center items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footerText}
            {/* Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link> */}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
