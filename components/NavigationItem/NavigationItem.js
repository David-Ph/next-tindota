import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavigationItem.module.css";

export default function NavigationItem({ children, href }) {
  const router = useRouter();
  const active = router.pathname === href ? styles.activeItem : "";

  return (
    <Link href={href}>
      <a className={`${styles.navigationItem} ${active}`}>{children}</a>
    </Link>
  );
}
