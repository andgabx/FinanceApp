interface PercentageItemProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
}

const PercentageItem = ({ icon, title, amount }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      <p className="font-bold text-sm">{amount}%</p>
    </div>
  );
};

export default PercentageItem;
