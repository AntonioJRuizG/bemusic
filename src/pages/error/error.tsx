import { Link } from "react-router-dom";
import styles from "./error.style.module.scss";

export default function ErrorPage() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionErrorTitle}>Error 404</h2>
      <h2 className={styles.sectionTitle}>
        The page you are looking for does not exist.
      </h2>
      <Link className={styles.goBackLink} to={"/"}>
        Go back
      </Link>
    </section>
  );
}
