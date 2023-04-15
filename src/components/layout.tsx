type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="main">
      <h1 className="heading">React研修：TODOアプリ</h1>
      <div className="container">{children}</div>
    </main>
  );
};
