import styles from "@/styles/Home.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <main className={styles.main}>{children}</main>;
};
