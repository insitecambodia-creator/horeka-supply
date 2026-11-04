import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Duplicate supplier record archived 2026-11-04 — merged into the
        // verified "Floral Express flower Shop (Cambodiaflorist)" listing.
        source: "/supplier/floral-express-cambodiaflorist",
        destination: "/supplier/floral-express-flower-shop-cambodiaflorist",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
