import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/ui/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensePerCategory from "./_components/expernse-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const searchParamsResolved = await searchParams;
  const month = searchParamsResolved.month as string;
  const year =
    (searchParamsResolved.year as string) ||
    new Date().getFullYear().toString();
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month, year);
  const userCanAddTransaction = await canUserAddTransaction();
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6 gap-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-6 overflow-hidden">
          {/* Esquerda */}
          <div className="flex flex-col gap-4">
            <SummaryCards
              depositsTotal={Number(dashboard.depositsTotal) || 0}
              investmentsTotal={Number(dashboard.investmentsTotal) || 0}
              expensesTotal={Number(dashboard.expensesTotal) || 0}
              balance={dashboard.balance}
              month={month}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart
                depositsTotal={
                  dashboard.depositsTotal ? Number(dashboard.depositsTotal) : 0
                }
                investmentsTotal={
                  dashboard.investmentsTotal
                    ? Number(dashboard.investmentsTotal)
                    : 0
                }
                expensesTotal={
                  dashboard.expensesTotal ? Number(dashboard.expensesTotal) : 0
                }
                balance={dashboard.balance}
                typesPercentage={dashboard.typesPercentage}
              />
              <ExpensePerCategory
                expensesPerCategory={dashboard.TotalExpensesPerCategory}
              />
            </div>
          </div>
          {/* Direita */}
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
