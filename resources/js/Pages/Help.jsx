import HelpIllustration from "@/Components/Graphics/HelpIllustration";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const Help = () => {
  const navbarHeight = document.getElementById("navbar")?.offsetHeight;

  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    email: "",
    name: "",
    message: "",
  });

  useEffect(() => {
    return () => {
      reset([
        'email',
        'name',
        'message'
      ]);
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("help"), {
      onSuccess: () => {
        reset('email', 'name', 'message')
      }
    });
  };

  return (
    <Layout>
      <Head title="Help" />
      <div
        style={{
          minHeight: `calc(90vh - ${navbarHeight}px)`,
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <Card>
          <CardBody className="flex flex-col lg:flex-row items-center gap-3">
            <HelpIllustration className="lg:h-[36rem] lg:w-[36rem] drop-shadow-md" />
            <div className="lg:border-l self-stretch lg:pl-12 lg:pr-24 flex flex-col justify-center">
              <Typography variant="h5" color="blue-gray">
                Contact us
              </Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="max-w-sm"
              >
                Fill up the form and we will get back to you as soon as
                possible. Thank you!
              </Typography>
              <Alert
                color="green"
                icon={
                  <InformationCircleIcon
                    strokeWidth={2}
                    className="h-6 w-6"
                  />
                }
                open={recentlySuccessful}
                className="my-3"
              >
                Message sent successfully.
              </Alert>
              <form onSubmit={submit} className="flex flex-col gap-3 my-3">
                <div>
                  <Input 
                    type="email" 
                    label="Email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                  />
                  {
                    errors.email &&
                    <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                      {errors.email}
                    </Typography>
                  }
                </div>
                <div>
                  <Input 
                    type="text" 
                    label="Name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                  />
                  {
                    errors.name &&
                    <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                      {errors.name}
                    </Typography>
                  }
                </div>
                <div>
                  <Textarea 
                    label="Message"
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                  />
                  {
                    errors.message &&
                    <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                      {errors.message}
                    </Typography>
                  }
                </div>
                <Button type="submit" variant="gradient" color="blue">
                  Submit
                </Button>
              </form>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="max-w-sm mb-3"
              >
                Alternatively, you can contact us here too:
              </Typography>
              <div className="flex gap-3">
                <a href="#">
                  <IconButton variant="gradient" color="blue">
                    <svg
                      className="h-6 w-6 rounded fill-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                    </svg>
                  </IconButton>
                </a>
                <a href="#">
                  <IconButton variant="gradient" color="light-blue">
                    <svg
                      className="h-6 w-6 rounded fill-gray-100"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z"></path>
                    </svg>
                  </IconButton>
                </a>
                <a href="#">
                  <IconButton variant="gradient" color="cyan">
                    <svg
                      className="h-6 w-6 rounded fill-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </IconButton>
                </a>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;
