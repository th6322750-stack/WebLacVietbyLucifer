import { BrandMark, type BrandName } from "@/components/ui/BrandMark";

export function TrustLogoRow({ brands }: { brands: BrandName[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90">
      {brands.map((b) => (
        <BrandMark key={b} name={b} size={32} />
      ))}
    </div>
  );
}
