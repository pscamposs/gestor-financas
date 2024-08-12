interface TableProps {
  columns: string;
  data: any;
}

export function THead({ children }: { children?: React.ReactNode }) {
  return (
    <thead className="sticky top-0 bg-white">
      <tr>{children}</tr>
    </thead>
  );
}

export function Table({ children }: { children?: React.ReactNode }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-zinc-600">
      {children}
    </table>
  );
}
