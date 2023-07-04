import { useState, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Button, Typography, Input, } from "@material-tailwind/react";
import axios from "axios";
import ConfirmPassword from "@/Components/Forms/ConfirmPassword";

const TwoFactor = () => {
  const { auth, confirmed_password } = usePage().props

  const [confirmingPassword, setConfirmingPassword] = useState(false);
  const [qrCode, setQRCode] = useState(null)
  const [recoveryCodes, setRecoveryCodes] = useState([])

  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    code: ""
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  useEffect(() => {
    if(auth.user.two_factor_secret && confirmed_password){
      getQR()
    }
    if(auth.user.two_factor_confirmed_at && confirmed_password){
      getCodes()
    }
  }, [auth])

  const getQR = async () => {
    await axios.get(route('two-factor.qr-code'))
    .then(response => {
      setQRCode(response.data.svg)
    })
  }

  const getCodes = async () => {
    await axios.get(route('two-factor.recovery-codes'))
    .then(response => {
      setRecoveryCodes(response.data)
    })
  }

  const enableTwoFactor = () => {
    router.post(route('two-factor.enable'), {}, {
      preserveScroll: true,
      onFinish: () => closeModal(),
    })
  }

  const confirmTwoFactor = (e) => {
    e.preventDefault()
    
    post(route('two-factor.confirm'), {
      preserveScroll: true,
      onFinish: () => closeModal(),
    })
  }

  const disableTwoFactor = () => {
    destroy(route('two-factor.disable'), {
      preserveScroll: true,
      onFinish: () => closeModal(),
    })
  }

  const openModal = () => setConfirmingPassword(true);
  const closeModal = () => setConfirmingPassword(false);

  return (
    <div className="max-w-xl my-6">
      <Typography variant="h6" color="blue-gray">
        Two Factor Authentication
      </Typography>
      <Typography variant="paragraph" color="gray" className="mb-3">
        Enable two factor authentication to verify your identity everytime you log in.
      </Typography>
      {
        (!auth.user.two_factor_secret && !auth.user.two_factor_confirmed_at) &&
        <>
          <Button variant="gradient" color="light-blue" onClick={openModal}>
            Enable 2FA
          </Button>
          <ConfirmPassword 
            confirmingPassword={confirmingPassword} 
            closeModal={closeModal} 
            onSuccess={enableTwoFactor}
          />
        </>
      }
      {
        (auth.user.two_factor_secret && !auth.user.two_factor_confirmed_at) &&
        <div className="my-3">
          <Typography variant="paragraph" color="gray" className="mb-3">
            Validate 2FA by scanning the QR Code and entering the OTP.
          </Typography>
          <div className="p-3 rounded-lg shadow w-fit mb-6" dangerouslySetInnerHTML={{__html: qrCode}}></div>
          <form onSubmit={confirmTwoFactor} className="flex flex-col gap-3">
            <div>
              <Input
                label="Two Factor Code"
                value={data.code}
                onChange={(e) => setData("code", e.target.value)}
                maxLength={6}
                error={errors.confirmTwoFactorAuthentication?.code}
              />
              {errors.confirmTwoFactorAuthentication?.code && (
                <Typography
                  variant="small"
                  color="red"
                  className="flex items-center gap-1 font-normal"
                >
                  {errors.confirmTwoFactorAuthentication?.code}
                </Typography>
              )}
            </div>
            <Button type="submit" variant="gradient" color="blue" className="w-fit">
              Confirm 2FA
            </Button>
          </form>
        </div>
      }
      {
        (auth.user.two_factor_confirmed_at && confirmed_password) ?
        <div className="my-3">
          <Typography variant="paragraph" color="gray" className="mb-3">
            Two factor authentication is now enabled. Scan the QR code below using your phone's authenticator application.
          </Typography>
          <div className="p-3 rounded-lg shadow w-fit mb-6" dangerouslySetInnerHTML={{__html: qrCode}}></div>
          <Typography variant="h6" color="blue-gray">
            Recovery Codes
          </Typography>
          <Typography variant="paragraph" color="gray" className="mb-3">
            Store these recovery codes in a secure password manager or print it out. These recovery codes can be used to recover your access to your account in the event that you lost the two factor authentication device.
          </Typography>
          <div className="grid grid-cols-2 gap-1 mb-3">
            {
              recoveryCodes.map(code =>
                <div key={code} className="p-3 shadow rounded-lg">{code}</div>
              )
            }
          </div>
          
          <Button variant="gradient" color="red" onClick={openModal}>
            Disable 2FA
          </Button>
          
          <ConfirmPassword 
            confirmingPassword={confirmingPassword} 
            closeModal={closeModal} 
            onSuccess={disableTwoFactor}
          />
        </div>
        :
        <>
          {
            auth.user.two_factor_confirmed_at && !confirmed_password &&
            <div className="my-3">
              <Button variant="gradient" color="blue" onClick={openModal}>
                Change 2FA
              </Button>
              
              <ConfirmPassword 
                confirmingPassword={confirmingPassword} 
                closeModal={closeModal} 
                onSuccess={closeModal}
              />
            </div>
          }
        </>
      }
    </div>
  );
};

export default TwoFactor;
