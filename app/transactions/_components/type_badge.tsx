import { Transaction, TransactionType } from "@prisma/client";
import { Badge, CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
    transaction: Transaction
    }



const TransactionTypeBadge = ({transaction}: TransactionTypeBadgeProps) => {
     if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted hover:bg-muted text-primary">
            <CircleIcon className="fill-primary mr-2" size={10} />
            Deposit
          </Badge>
        );
      }

      if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="font-bold text-danger bg-danger bg-opacity-10">
            <CircleIcon
              className="fill-danger text-destructive mr-2"
              size={10}
            />
            Despesa
          </Badge>
        );
      }

      if (transaction.type === TransactionType.INVESTMENT) {
        return (
          <Badge className="font-bold bg-white bg-opacity-10 text-white">
            <CircleIcon
              className="fill-white mr-2"
              size={10}
            />
            Investiment
          </Badge>
        );
      }

}
 
export default TransactionTypeBadge;