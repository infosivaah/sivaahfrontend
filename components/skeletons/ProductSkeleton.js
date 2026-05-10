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
      <style jsx>{`.skeleton {
  background: linear-gradient(
    90deg,
    #f3eee7 25%,
    #ece4d9 50%,
    #f3eee7 75%
  );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;

  border-radius: 16px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-img {
  width: 100%;
  aspect-ratio: 1 / 1.1;
}

.skeleton-thumb {
  width: 80px;
  height: 80px;
}

.skeleton-text {
  height: 18px;
}

.skeleton-btn {
  height: 50px;
  width: 220px;
}`}</style>
    </div>
  );
}
