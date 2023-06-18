import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import LoginForm from "@/Components/Forms/LoginForm";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
} from "@material-tailwind/react";
import RegisterForm from "@/Components/Forms/RegisterForm";

const Auth = ({ page, ...props }) => {
  return (
    <Layout>
      <Head title="Login" />
      <div className="w-full min-h-[inherit] flex justify-center items-center">
        <Card className="p-3 min-w-[24rem] my-12">
          <Tabs value={page}>
            <TabsHeader indicatorProps={{ className: 'bg-gradient-to-tr from-blue-600 to-blue-400' }} className="mt-3 mx-3">
              <Tab value="login" className="font-medium transition-colors duration-500" activeClassName="text-gray-50">
                Sign In
              </Tab>
              <Tab value="register" className="font-medium transition-colors duration-500" activeClassName="text-gray-50">
                Sign Up
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="login">
                <LoginForm { ...props } />
              </TabPanel>
              <TabPanel value="register">
                <RegisterForm { ...props } />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
      </div>
    </Layout>
  )
}

export default Auth