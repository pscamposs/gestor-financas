import { useMemo } from "react";

export const useCalculateTotals = (
  invoices?: InvoiceProps[],
  salary?: number
) => {
  const { creditTotal, annualTotal, limitTotal } = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let creditTotal = 0;
    let monthlyTotal = 0;
    let annualTotal = 0;
    let limitTotal = 0;

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
        } else {
          return;
        }

        if (
          invoice.method === "Crédito" &&
          invoiceMonth === currentMonth &&
          invoiceDay <= closingDay
        ) {
          creditTotal += invoiceValue;
          monthlyTotal += invoiceValue;
        } else if (
          invoiceMonth === currentMonth &&
          invoice.method !== "Crédito"
        ) {
          monthlyTotal += invoiceValue;
        }
      } else if (invoice.flow === "Entrada") {
        if (invoiceMonth === currentMonth) {
          monthlyTotal -= invoiceValue;
        }
      }
    });

    if (salary) limitTotal = salary - monthlyTotal;

    return { creditTotal, annualTotal, limitTotal };
  }, [invoices, salary]);

  return { creditTotal, annualTotal, limitTotal };
};
