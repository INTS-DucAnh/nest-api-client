import LoginForm from '@/components/form/login';

export default function LoginRoute() {
  return (
    <div className="flex h-full w-full">
      <div className="flex-1 grid place-items-center">
        <div className="w-fit h-fit m-auto">
          <div className="grid gap-2 text-center mb-10">
            <h1 className="text-3xl font-bold test">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="flex-1 bg-muted">
        <img
          alt="login"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1637963953070-e0f3d08da3c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
}
