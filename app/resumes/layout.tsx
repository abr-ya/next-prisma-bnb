const resumeLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-[calc(100vh-92px)] flex-col">{children}</div>;
};

export default resumeLayout;
