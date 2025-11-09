type PriceProps = {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Price({
  amount,
  className = "",
  size = "md",
}: PriceProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <span
      className={`font-medium tracking-wide text-foreground ${sizeClasses[size]} ${className}`}
    >
      {formattedPrice}
    </span>
  );
}
