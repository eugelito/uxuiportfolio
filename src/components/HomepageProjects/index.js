import Link from "@docusaurus/Link";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import { ProjectList } from "./projectList";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(date) {
  const [month, year] = date.split("/");
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

function parseDate(date) {
  const [month, year] = date.split("/");
  return new Date(year, month - 1);
}

function Project({ Img, title, link, date }) {
  return (
    <div className={clsx("col col--4", styles.projectCol)}>
      <Link
        to={link}
        style={{
          color: "white",
          textDecoration: "none",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.color = "var(--ifm-color-primary)")
        }
        onMouseOut={(e) => (e.currentTarget.style.color = "white")}
      >
        <div className="text--center">
          <div className={styles.dateLeft}>
            <span>{formatDate(date)}</span>
          </div>
          <img
            src={Img}
            className={`${styles.projectImg} ${styles.fixedHeight}`}
            alt={title}
          />

          <div className="padding-horiz--md">
            <Heading as="h3">{title}</Heading>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageProjects() {
  // Sort the projects by date, most recent first
  const sortedProjectList = [...ProjectList].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
  );

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {sortedProjectList.map((props, idx) => (
            <Project key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
