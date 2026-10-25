import type { ComponentType } from "react";
import { AGCambodiaFeatured } from "@/components/featured/AGCambodiaFeatured";
import { SunshineKitchenEquipmentFeatured } from "@/components/featured/SunshineKitchenEquipmentFeatured";

// Hand-authored Featured-supplier pages, keyed by the supplier's slug.
// A supplier only renders one of these when its `hasFeaturedPage` flag is
// also true — the flag and this registry both have to agree, so toggling
// `hasFeaturedPage` off falls straight back to the standard layout even if
// the component stays registered here.
export const FEATURED_SUPPLIER_PAGES: Record<string, ComponentType> = {
  "ag-cambodia-insurance-broker": AGCambodiaFeatured,
  "sunshine-kitchen-equipment": SunshineKitchenEquipmentFeatured,
};
