import MenuFormPreview from '@/app/features/restaurant/menu-form-preview.component.tsx';
import MenuRegister from '@/app/features/restaurant/restaurant-menu-register.component.tsx';
import { getRestaurantMenus } from '@/app/services/restaurant.service.ts';

type Props = {
	searchParams: {
		id: string; //restaurantId
	};
};

export default async function Page({ searchParams }: Props) {
	const { id } = searchParams;
	const { data: restaurantMenus, error: restaurantMenusError } =
		await getRestaurantMenus(id);

	return (
		<div className="flex min-h-svh w-full max-w-xl justify-center ">
			<section className="w-full max-w-lg border bg-slate-50">
				<div className="flex items-center bg-slate-200 px-4 py-2">
					<h2 className="text-lg">메뉴 등록</h2>
				</div>

				<div className="my-4 divide-y-2 divide-dashed px-6 sm:px-10">
					<ul className="mb-4 flex flex-col gap-4">
						{restaurantMenusError && <p>restaurantMenusError</p>}
						<MenuFormPreview restaurantMenus={restaurantMenus} />
					</ul>

					<MenuRegister
						restaurantId={id}
						menusCount={restaurantMenus?.length ?? 0}
					/>
				</div>
			</section>
		</div>
	);
}
