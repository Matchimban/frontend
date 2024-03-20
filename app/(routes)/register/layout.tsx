const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<main className="flex min-h-svh justify-center">{children}</main>
		</div>
	);
};

export default Layout;
