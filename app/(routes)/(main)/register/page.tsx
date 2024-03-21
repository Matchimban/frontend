import RegisterForm from '@/app/features/restaurant/register-form.component';

export default async function Page() {
	return (
		<div className="flex min-h-svh w-full max-w-xl justify-center ">
			<section className="w-full max-w-lg border bg-slate-50">
				<div className="flex items-center bg-slate-200 px-4 py-2">
					<h2 className="text-lg">매장 등록</h2>
				</div>

				<div className="my-4 px-6 sm:px-10">
					<RegisterForm />
				</div>
			</section>
		</div>
	);
}
