export default function ProductSkeleton() {
  return (
    <div className="container mt-5">
      <div className="row g-5">
        <div className="col-md-6">
          <div className="skeleton skeleton-img" />
          <div className="d-flex gap-2 mt-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton skeleton-thumb" />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <div className="skeleton skeleton-text w-25 mb-2" />
          <div className="skeleton skeleton-text w-75 mb-3" />
          <div className="skeleton skeleton-text w-50 mb-3" />
          <div className="skeleton skeleton-text w-100 mb-2" />
          <div className="skeleton skeleton-text w-90 mb-2" />
          <div className="skeleton skeleton-btn mt-4" />
        </div>
      </div>
    </div>
  );
}
