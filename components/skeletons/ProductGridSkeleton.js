export default function ProductGridSkeleton() {
  return (
    <div className="row g-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="col-6 col-md-3">
          <div className="skeleton skeleton-img mb-2" />
          <div className="skeleton skeleton-text w-75 mb-1" />
          <div className="skeleton skeleton-text w-50" />
        </div>
      ))}
    </div>
  );
}
