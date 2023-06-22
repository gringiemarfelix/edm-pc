import { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Checkbox, Input, Typography, Button, CardFooter, CardBody } from "@material-tailwind/react";
import SocialButtons from "./SocialButtons";

const LoginForm = ({ status, canResetPassword }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <form onSubmit={submit}>
      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}
      <SocialButtons isLogin />
      <CardBody className="p-0 flex flex-col">
        <div className="mb-3">
          <Input
            size="lg"
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            success={errors.length && !errors.email}
            error={errors.email !== undefined}
          />
          {
            errors.email &&
            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
              {errors.email}
            </Typography>
          }
        </div>
        <Input
          size="lg"
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          success={errors.length && !errors.password}
          error={errors.password !== undefined}
          containerProps={{
            className: 'flex flex-col'
          }}
        />
        {
          errors.password &&
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
            {errors.password}
          </Typography>
        }

        <div className="-ml-2.5 text-sm mb-3">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="p-0">
        <Button type="submit" variant="gradient" disabled={processing} fullWidth>
          Sign In
        </Button>
        {
          canResetPassword &&
          <Link href={route("password.request")}>
            <Typography variant="small" className="text-gray-600 hover:underline text-center mt-3">
              Forgot your password?
            </Typography>
          </Link>
        }
      </CardFooter>
    </form>
  );
};

export default LoginForm;
