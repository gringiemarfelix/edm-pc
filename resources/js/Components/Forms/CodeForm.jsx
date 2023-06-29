import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Input, Typography, Button, CardBody } from "@material-tailwind/react";

const CodeForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    code: "",
  });

  useEffect(() => {
    return () => {
      reset("code");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("two-factor.login"), {
      onSuccess: (page) => {
        console.log(page)
      },
      onError: (page) => {
        console.log(page)
      },
    });
  };

  return (
    <CardBody className="p-0 flex flex-col">
      <form onSubmit={submit} className="flex flex-col gap-3">
        <div>
          <Input
            size="lg"
            label="2FA Code"
            type="text"
            value={data.code}
            onChange={(e) => setData("code", e.target.value)}
            success={errors.length && !errors.code}
            error={errors.code !== undefined}
          />
          {
            errors.code &&
            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
              {errors.code}
            </Typography>
          }
        </div>
        <Button type="submit" variant="gradient" disabled={processing} fullWidth>
          Login
        </Button>
      </form>
    </CardBody>
  )
}

export default CodeForm