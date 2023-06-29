import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import {
  Button,
  Typography,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const ConfirmPassword = ({ confirmingPassword, closeModal, onSuccess }) => {
  const passwordInput = useRef();

  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    password: "",
    code: ""
  });

  const confirmPassword = (e) => {
    e.preventDefault();

    post(route("password.confirm"), {
      onSuccess: onSuccess
    })
  };

  return (
    <Dialog open={confirmingPassword} handler={closeModal} size="sm">
      <form onSubmit={confirmPassword}>
        <DialogHeader>
          Confirm Password
        </DialogHeader>
        <DialogBody divider>
          <div className="flex justify-center my-3">
            <div className="bg-amber-500 p-3 rounded-full shadow">
              <LockClosedIcon className="h-24 w-24 text-gray-50" />
            </div>
          </div>
          <Typography variant="paragraph" color="gray" className="text-center">
            This is a secure area of the application. Please confirm your
            password before continuing.
          </Typography>

          <div className="mt-3">
            <Input
              type="password"
              label="Password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              ref={passwordInput}
            />
            {errors.password && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.password}
              </Typography>
            )}
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
          <Button
            type="submit"
            variant="gradient"
            color="amber"
            disabled={processing}
          >
            Confirm Password
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default ConfirmPassword