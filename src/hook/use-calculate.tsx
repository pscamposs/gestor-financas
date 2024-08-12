export const useCalculateTotals = (invoices: InvoiceProps[]) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const previousMonth = currentMonth - 1;
  const currentYear = currentDate.getFullYear();

  let creditTotal = 0;
  let monthlyTotal = 0;
  let annualTotal = 0;

  invoices?.forEach((invoice) => {
    const closingDay = invoice.bank_closing_day;
    const invoiceDate = new Date(invoice.date);
    const invoiceYear = invoiceDate.getFullYear();
    const invoiceMonth = invoiceDate.getMonth() + 1;
    const invoiceDay = invoiceDate.getDate();
    const invoiceValue = Number(invoice.value);

    if (invoice.flow === "Saída") {
      if (invoiceYear === currentYear) {
        annualTotal += invoiceValue;
      }
      if (invoiceMonth === currentMonth && invoiceYear === currentYear) {
        monthlyTotal += invoiceValue;
      } else if (invoiceMonth === previousMonth && invoiceDay >= closingDay) {
        monthlyTotal += invoiceValue;
      }
      if (invoice.method === "Crédito") {
        creditTotal += invoiceValue;
      }
    } else {
      monthlyTotal -= invoiceValue;
    }
  });

  return { creditTotal, monthlyTotal, annualTotal };
};
