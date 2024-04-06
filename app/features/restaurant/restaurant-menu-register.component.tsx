'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import { createMenu } from '@/app/features/restaurant/_server-actions.ts';
import MenuForm from '@/app/features/restaurant/menu-form.component.tsx';

type Props = { restaurantId: string };

export default function MenuRegister({ restaurantId }: Props) {
	const [menus, setMenus] = useState<number[]>([0, 1, 2, 3]); // default value 포함 5개 이상 맞추기 (레이아웃때매 스크롤 탑 적용이 안됨)
	const handleSubmit = async (values: any) => {
		console.log('Received values of form:', values);
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('price', values.price);
		formData.append('images', values.image.file);

		const { error } = await createMenu(restaurantId, formData);
		if (error) {
			throw error; // 폼 제출 에러 핸들링하기
		}
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
			<ul className="mb-4 flex flex-col divide-y divide-dashed">
				{menus.map(menuId => {
					return (
						<li key={menuId}>
							<MenuForm
								id={menuId}
								onSubmit={handleSubmit}
								onRemove={handleRemove}
							/>
						</li>
					);
				})}
			</ul>

			<div className="flex flex-col gap-8">
				<Button type="dashed" onClick={handleAdd} block icon={<PlusOutlined />}>
					메뉴 추가
				</Button>

				<Button type="primary">등록 완료</Button>
			</div>
		</div>
	);
}
