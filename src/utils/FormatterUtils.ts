export const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString();
};

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
};

export const isValidSvg = (svg: string): boolean => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  return (
    doc.getElementsByTagName("parsererror").length === 0 &&
    doc.documentElement.nodeName === "svg"
  );
};
