import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DeleteUser() {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <div className="max-w-xl my-6">
      <Typography variant="h6" color="blue-gray">
        Delete Account
      </Typography>
      <Typography variant="paragraph" color="gray" className="mb-6">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </Typography>

      <Button variant="gradient" color="red" onClick={confirmUserDeletion}>
        Delete Account
      </Button>

      <Dialog open={confirmingUserDeletion} handler={closeModal} size="sm">
        <form onSubmit={deleteUser}>
          <DialogHeader>Are you sure you want to delete your account?</DialogHeader>
          <DialogBody divider>
            <div className="flex justify-center my-3">
              <ExclamationTriangleIcon class="h-24 w-24 text-red-500" />
            </div>
            <Typography variant="paragraph" color="gray">
              Once your account is deleted, all of its resources and data will be
              permanently deleted. Please enter your password to confirm you would
              like to permanently delete your account.
            </Typography>

            <div className="mt-3">
              <Input 
                type="password"
                label="Password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                ref={passwordInput}
              />
              {
                errors.password &&
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                  {errors.password}
                </Typography>
              }
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="blue-gray"
              onClick={closeModal}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="red" disabled={processing}>
              Delete Account
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
