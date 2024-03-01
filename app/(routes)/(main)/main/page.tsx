import LoginTest from '@/app/(routes)/(main)/main/login-test.tsx';
import { getDummyData } from '@/app/__tests__/__mocks__/dummy-data';
import Contents from '@/app/features/board/contents.component.tsx';

export default async function Page() {
	const { restaurants } = await getDummyData();

	return (
		<div className="flex min-h-svh w-full max-w-[768px] flex-col bg-red-100">
			<div>
				<ul className="flex flex-col divide-y p-2 sm:grid sm:grid-cols-2 sm:divide-none ">
					<LoginTest />
					<Contents restaurants={restaurants} />
				</ul>
			</div>
		</div>
	);
}
