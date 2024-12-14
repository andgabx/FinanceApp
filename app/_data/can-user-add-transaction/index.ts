import { auth, clerkClient } from "@clerk/nextjs/server";
import { getMonthTransactions } from "../get-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const currentMonthTransactions = await getMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
