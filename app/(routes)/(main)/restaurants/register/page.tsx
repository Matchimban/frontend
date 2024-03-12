import Link from 'next/link';

import RegisterForm from '@/app/features/restaurants/register-form.component';

export default async function Page() {
	return (
		<div className="flex min-h-svh w-full max-w-[768px] justify-center bg-green-200">
			<section className="w-full max-w-xs">
				<div className="flex h-10 items-center bg-slate-200">
					<h2 className="text-lg">매장 등록</h2>
				</div>
				<Link href={'../'}>취소</Link>
				<div className="bg-orange-200 px-4 sm:px-8">
					<RegisterForm />
				</div>
			</section>
		</div>
	);
}