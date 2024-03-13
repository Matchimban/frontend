import { baseUrl } from '@/app/constants/path.ts';
import { RestaurantPreview } from '@/app/features/board/_types.ts';
import Contents from '@/app/features/board/contents.component.tsx';
import { ResponseData } from '@/app/types/index.ts';

export default async function Page() {
	const res = await fetch(baseUrl + '/api/restaurants');
	const data: ResponseData<RestaurantPreview[]> = await res.json();
	const restaurants = data.result;

	return (
		<div className="flex min-h-svh w-full max-w-3xl flex-col border-x">
			<div className="flex flex-col divide-y">
				<div className="mx-4 my-2">
					<span>전체 보기</span>
				</div>

				<ul className="flex flex-col divide-y p-2 sm:grid sm:grid-cols-3 sm:divide-none ">
					<Contents restaurants={restaurants} />
				</ul>
			</div>
		</div>
	);
}
