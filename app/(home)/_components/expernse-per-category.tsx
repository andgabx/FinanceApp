import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { Transaction_Category_Labels } from "@/app/_constants/transactions";
import { TotalExpensesPerCategory } from "@/app/_data/get-dashboard/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ExpensePerCategoryProps {
  expensesPerCategory: TotalExpensesPerCategory[];
}

const ExpensePerCategory = ({
  expensesPerCategory,
}: ExpensePerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border p-6 h-full">
      <CardHeader>
        <CardTitle>Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p>{Transaction_Category_Labels[category.category]}</p>
              <p>{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensePerCategory;
