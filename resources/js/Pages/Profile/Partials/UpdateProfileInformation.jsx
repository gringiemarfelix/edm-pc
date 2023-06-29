import { useForm, usePage } from "@inertiajs/react";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function UpdateProfileInformation() {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      phone: user.phone
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <div className="max-w-xl">
      <Typography variant="h6" color="blue-gray">
        Profile Information
      </Typography>
      <Typography variant="paragraph" color="gray">
        Update your account's profile information.
      </Typography>

      <form onSubmit={submit} className="my-3">
        <div className="flex flex-col gap-3 mb-3">
          <div>
            <Input 
              type="text"
              label="Name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              error={errors.name}
            />
            {
              errors.name &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.name}
              </Typography>
            }
          </div>
          <div>
            <Input 
              type="email"
              label="Email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              error={errors.email}
            />
            {
              errors.email &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.email}
              </Typography>
            }
          </div>
          <div>
            <div className="relative flex w-full">
              <Typography 
                variant="small" 
                color="white" 
                className="font-medium flex items-center p-2 bg-blue-500 rounded-l-lg border border-blue-gray-200 border-r-0"
              >
                  +63
                </Typography>
              <Input 
                type="tel"
                placeholder="Phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                className={`rounded-l-none focus:!border-t-blue-500 ${errors.phone ? '!border-red-500' : '!border-t-blue-gray-200'}`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
                maxLength={10}
              />
            </div>
            {
              errors.phone &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.phone}
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
