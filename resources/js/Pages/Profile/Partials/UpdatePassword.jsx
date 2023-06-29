import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Typography, Input, Button } from "@material-tailwind/react";

export default function UpdatePassword() {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      },
    });
  };

  return (
    <div className="max-w-xl">
      <Typography variant="h6" color="blue-gray">
        Account Security
      </Typography>
      <Typography variant="paragraph" color="gray">
        Ensure your account is using a long, random password to stay secure.
      </Typography>

      <form onSubmit={updatePassword} className="my-3">
        
      <div className="flex flex-col gap-3 mb-3">
          <div>
            <Input 
              type="password"
              label="Current Password"
              value={data.current_password}
              onChange={(e) => setData("current_password", e.target.value)}
              ref={currentPasswordInput}
              error={errors.current_password}
            />
            {
              errors.current_password &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.current_password}
              </Typography>
            }
          </div>
          <div>
            <Input 
              type="password"
              label="New Password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              ref={passwordInput}
              error={errors.password}
            />
            {
              errors.password &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.password}
              </Typography>
            }
          </div>
          <div>
            <Input 
              type="password"
              label="Confirm Password"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              error={errors.password_confirmation}
            />
            {
              errors.password_confirmation &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.password_confirmation}
              </Typography>
            }
          </div>
        </div>
        <Button type="submit" variant="gradient" disabled={processing}>
          Save
        </Button>
      </form>
      {
        recentlySuccessful &&
        <Typography color="green">
          Saved.
        </Typography>
      }
    </div>
  );
}
