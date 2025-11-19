export const getStatusBadgeClass = (status: string) => {
  const colors = {
    processing: "text-blue-600 bg-blue-50",
    shipped: "text-purple-600 bg-purple-50",
    delivered: "text-green-600 bg-green-50",
    cancelled: "text-red-600 bg-red-50",
  };

  return colors[status as keyof typeof colors] || "text-gray-600 bg-gray-50";
};

export const getStatusText = (status: string) => {
  const texts = {
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return texts[status as keyof typeof texts] || status;
};
