type SupplierBadgesProps = {
  verified?: boolean;
  sponsored?: boolean;
  className?: string;
};

export function SupplierBadges({ verified, sponsored, className }: SupplierBadgesProps) {
  if (!verified && !sponsored) return null;

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {sponsored && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 1.5l2.53 5.13 5.66.82-4.1 4 .97 5.64L10 14.5l-5.06 2.66.97-5.64-4.1-4 5.66-.82L10 1.5z" />
          </svg>
          Sponsored
        </span>
      )}
      {verified && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M10 1.5l2.09 1.06 2.34-.2 1.06 2.09 2.09 1.06-.2 2.34 1.06 2.09-1.06 2.09.2 2.34-2.09 1.06-1.06 2.09-2.34-.2L10 18.5l-2.09-1.06-2.34.2-1.06-2.09-2.09-1.06.2-2.34L1.5 10l1.06-2.09-.2-2.34 2.09-1.06 1.06-2.09 2.34.2L10 1.5zm3.03 6.22a.75.75 0 00-1.06-1.06L8.75 10 7.03 8.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l3.75-3.75z"
              clipRule="evenodd"
            />
          </svg>
          Verified
        </span>
      )}
    </div>
  );
}
