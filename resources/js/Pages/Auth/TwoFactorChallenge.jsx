import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
} from "@material-tailwind/react";
import CodeForm from "@/Components/Forms/CodeForm";
import RecoveryForm from "@/Components/Forms/RecoveryForm";

const TwoFactorChallenge = () => {
  return (
    <Layout>
      <Head title="Two Factor Login" />
      <div className="w-full min-h-[inherit] flex justify-center items-center">
        <Card className="p-3 min-w-[24rem] my-12">
          <Tabs value="code">
            <TabsHeader indicatorProps={{ className: 'bg-gradient-to-tr from-blue-600 to-blue-400' }} className="mt-3 mx-3">
              <Tab value="code" className="font-medium transition-colors duration-500" activeClassName="text-gray-50">
                Code
              </Tab>
              <Tab value="recover" className="font-medium transition-colors duration-500" activeClassName="text-gray-50">
                Recovery Code
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="code">
                <CodeForm />
              </TabPanel>
              <TabPanel value="recover">
                <RecoveryForm />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
      </div>
    </Layout>
  )
}

export default TwoFactorChallenge