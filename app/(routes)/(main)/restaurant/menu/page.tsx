import MenuRegister from '@/app/features/restaurant/restaurant-menu-register.component.tsx';

type Props = {
	searchParams: {
		id: string; //restaurantId
	};
};

export default async function Page({ searchParams }: Props) {
	const { id } = searchParams;

	return (
		<div className="flex min-h-svh w-full max-w-xl justify-center ">
			<section className="w-full max-w-lg border bg-slate-50">
				<div className="flex items-center bg-slate-200 px-4 py-2">
					<h2 className="text-lg">메뉴 등록</h2>
				</div>

				<div className="my-4 px-6 sm:px-10">
					<MenuRegister restaurantId={id} />
				</div>
			</section>
		</div>
	);
}
