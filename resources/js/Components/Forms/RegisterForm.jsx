import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
  Input,
  Typography,
  Button,
  CardFooter,
  CardBody,
} from "@material-tailwind/react";
import SocialButtons from "./SocialButtons";

const RegisterForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <form onSubmit={submit}>
      <SocialButtons />
      <CardBody className="p-0 flex flex-col">
        <div className="mb-3">
          <Input
            size="lg"
            label="Name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            success={errors.length && !errors.name}
            error={errors.name !== undefined}
          />
          {
            errors.name && 
            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
              {errors.name}
            </Typography>
          }
        </div>
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
        <div className="mb-3">
          <Input
            size="lg"
            label="Password"
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            success={errors.length && !errors.password}
            error={errors.password !== undefined}
          />
          {
            errors.password && 
            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
              {errors.password}
            </Typography>
          }
        </div>
        <div className="mb-3">
          <Input
            size="lg"
            label="Confirm Password"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            success={errors.length && !errors.password_confirmation}
            error={errors.password_confirmation !== undefined}
          />
          {
            errors.password_confirmation && 
            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
              {errors.password_confirmation}
            </Typography>
          }
        </div>
      </CardBody>
      <CardFooter className="p-0">
        <Button
          type="submit"
          variant="gradient"
          disabled={processing}
          fullWidth
        >
          Sign Up
        </Button>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
