import { useRouter } from "next/router";

export default function Linker({ path, className, children }) {
  const router = useRouter();
  return (
    <div className={className} onClick={() => router.push(path)}>
      {children}
    </div>
  );
}
