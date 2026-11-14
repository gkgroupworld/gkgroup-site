import Link from "next/link";

export function CTA({ href, children, variant = "primary" }) {
  const style = variant === "primary" ? "bg-[#946020] text-white hover:bg-[#805217]" : "border border-white text-white hover:bg-white hover:text-[#061b46]";
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm font-bold transition ${style}`}>{children}</Link>;
}
