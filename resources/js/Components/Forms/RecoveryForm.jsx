import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Input, Typography, Button, CardBody } from "@material-tailwind/react";

const RecoveryForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    recovery_code: "",
  });

  useEffect(() => {
    return () => {
      reset("recovery_code");
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
            label="Recovery Code"
            type="text"
            value={data.recovery_code}
            onChange={(e) => setData("recovery_code", e.target.value)}
            success={errors.length && !errors.recovery_code}
            error={errors.recovery_code !== undefined}
          />
          {
            errors.recovery_code &&
            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
              {errors.recovery_code}
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

export default RecoveryForm