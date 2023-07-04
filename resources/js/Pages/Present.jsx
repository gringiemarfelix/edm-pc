import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const Present = () => {
  const navbarHeight = document.getElementById("navbar")?.offsetHeight;

  return (
    <Layout>
      <Head title="Presentation" />
      <div
        style={{
          minHeight: `calc(90vh - ${navbarHeight}px)`,
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <Card className="min-w-[50vw] text-blue-gray-900 my-24">
          <CardHeader className="p-3 text-center shadow-none bg-transparent -mt-12">
            <Button variant="gradient" color="blue">
              <Typography variant="h1" className="mb-1">
                ecom.gringiemarfelix.com
              </Typography>
            </Button>
          </CardHeader>
          <CardBody>
            <Typography variant="h6" className="mb-1">
              The Problem
            </Typography>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li className="font-medium">PC Express</li>
              <ul className="list-disc list-inside ml-6">
                <li>Too Much Navigation</li>
                <li>Bloated with Graphics</li>
                <li>Misplaced Product Tags</li>
                <li>Lack of Social Logins</li>
                <li>
                  <a 
                    href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fpcx.com.ph%2F" 
                    target="_blank"
                    className="underline text-blue-500"
                  >
                    Performance
                  </a>
                </li>
              </ul>
              <li className="font-medium">EasyPC</li>
              <ul className="list-disc list-inside ml-6">
                <li>Unresponsive Sticky Navbar</li>
                <li>Load Time</li>
                <li>Weak Password Pattern</li>
                <li>
                  <a 
                    href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Feasypc.com.ph%2F" 
                    target="_blank"
                    className="underline text-blue-500"
                  >
                    Performance
                  </a>
                </li>
              </ul>
              <li className="font-medium">DynaQuest PC</li>
              <ul className="list-disc list-inside ml-6">
                <li>Messy User Interface</li>
                <li>Lack of Password Pattern</li>
                <li>Lack of Social Logins</li>
                <li>
                  <a 
                    href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdynaquestpc.com%2F" 
                    target="_blank"
                    className="underline text-blue-500"
                  >
                    Performance
                  </a>
                </li>
              </ul>
            </ul>

            <hr className="my-3" />

            <Typography variant="h6" className="mb-1">
              System Features
            </Typography>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li className="font-medium">Better Loading</li>
              <ul className="list-disc list-inside ml-6">
                <li>Responsive and Fast Click Interactions</li>
                <li>
                  <a 
                    href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fecom.gringiemarfelix.com%2F" 
                    target="_blank"
                    className="underline text-blue-500"
                  >
                    Performance
                  </a>
                </li>
              </ul>
              <li className="font-medium">Aesthetic</li>
              <ul className="list-disc list-inside ml-6">
                <li>Neat UI/UX</li>
                <li>Best Practices</li>
                <li>Responsive Web Design</li>
              </ul>
              <li className="font-medium">Security</li>
              <ul className="list-disc list-inside ml-6">
                <li>Two-Factor Authentication</li>
                <li>Strong Password Pattern</li>
              </ul>
              <li className="font-medium">Payment</li>
              <ul className="list-disc list-inside ml-6">
                <li>Variety of Payment Options via PayMongo API</li>
              </ul>
              <li className="font-medium">Delivery</li>
              <ul className="list-disc list-inside ml-6">
                <li>Track Order via Lalamove API</li>
                <li>Address Management</li>
              </ul>
            </ul>

            <hr className="my-3" />

            <Typography variant="h6" className="mb-1">
              Screens
            </Typography>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li className="font-medium">Users</li>
              <ul className="list-disc list-inside ml-6">
                <li>Home</li>
                <li>Search</li>
                <li>Category</li>
                <li>Brand</li>
                <li>Product</li>
                <li>Profile</li>
                <ul className="list-disc list-inside ml-6">
                  <li>Info</li>
                  <li>Edit</li>
                  <li>Security</li>
                  <li>Address</li>
                  <li>Orders</li>
                  <li>Refunds</li>
                </ul>
                <li>Help</li>
                <li>Sign in</li>
                <li>Sign up</li>
              </ul>
              <li className="font-medium">Admin</li>
              <ul className="list-disc list-inside ml-6">
                <li>Dashboard</li>
                <li>Promotions - CRUD</li>
                <li>Categories - CRUD</li>
                <li>Brands - CRUD</li>
                <li>Products - CRUD</li>
                <li>Order</li>
                <li>Refunds</li>
              </ul>
            </ul>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Present;
