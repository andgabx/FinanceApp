import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/ui/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";


interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const {userId} = await auth();
  if (!userId) {
    redirect('/login')
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect('?month=01');
  }

const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6 gap-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect/>
        </div>
        <div className="grid grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
          <SummaryCards {...dashboard} month={month} />
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart 
              depositsTotal={dashboard.depositsTotal ? Number(dashboard.depositsTotal) : 0}
              investmentsTotal={dashboard.investmentsTotal ? Number(dashboard.investmentsTotal) : 0}
              expensesTotal={dashboard.expensesTotal ? Number(dashboard.expensesTotal) : 0}
              balance={dashboard.balance}
            />
          </div>
          </div>

        </div>

      </div>


    </>
  );
}
 
export default Home;