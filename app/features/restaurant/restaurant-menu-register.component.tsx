'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createMenu } from '@/app/features/restaurant/_server-actions.ts';
import MenuForm from '@/app/features/restaurant/menu-form.component.tsx';

type Props = { restaurantId: string; menusCount: number };

export default function MenuRegister({ restaurantId, menusCount }: Props) {
	const [menus, setMenus] = useState<number[]>(
		Array.from({ length: 4 - menusCount > 0 ? 4 - menusCount : 1 }).map(
			(_, idx) => idx,
		),
	); // default value 포함 4개 이상 맞추기 (레이아웃때매 스크롤 탑 적용이 안됨)
	const router = useRouter();

	const handleSubmit = (id: number) => async (values: any) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('price', values.price);
		formData.append('images', values.image.file);

		const { error } = await createMenu(restaurantId, formData);
		if (error) {
			throw error; // 폼 제출 에러 핸들링하기
		}

		setMenus(prevMenus => prevMenus.filter(menuId => menuId !== id));

		// Next.js의 서버 액션이 호출되면 자동으로 업데이트된 데이터와 ui를 받기 때문에 클라이언트에서 아래 미리보기를 제공 할 필요가 없음.
		// const [menuPreviews, setMenuPreviews] = useState<RestaurantMenu[]>([]);
		// const newMenu = {
		// 	id: Math.random(),
		// 	...values,
		// 	imageUrl: [
		// 		{
		// 			imageId: Math.random(),
		// 			savedFileUrl: await getBase64(values.image.file as File),
		// 		},
		// 	],
		// } as RestaurantMenu;

		// setMenuPreviews(prevMenuPreviews => [...prevMenuPreviews, newMenu]);
	};

	const handleComplete = () => {
		router.push(`/restaurant/${restaurantId}`);
	};

	const handleAdd = () => {
		if (menus.length === 0) setMenus([0]);
		else setMenus(prevMenus => [...prevMenus, prevMenus.slice(-1)[0] + 1]);
	};
	const handleRemove = (id: number) => {
		setMenus(prevMenus => prevMenus.filter(menuId => menuId !== id));
	};

	return (
		<div>
			<div className="flex flex-col gap-4 divide-y-2 divide-dashed">
				{/* <ul className="mb-2 flex flex-col gap-4">
					{<MenuFormPreview restaurantMenus={menuPreviews} />}
				</ul> */}

				<ul className="mb-4 flex flex-col divide-y divide-dashed">
					{menus.map(menuId => {
						return (
							<li key={menuId}>
								<MenuForm
									id={menuId}
									onSubmit={handleSubmit(menuId)}
									onRemove={handleRemove}
								/>
							</li>
						);
					})}
				</ul>
			</div>

			<div className="flex flex-col gap-8">
				<Button type="dashed" onClick={handleAdd} block icon={<PlusOutlined />}>
					메뉴 추가
				</Button>

				<Button type="primary" onClick={handleComplete}>
					등록 완료
				</Button>
			</div>
		</div>
	);
}
