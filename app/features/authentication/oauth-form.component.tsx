import { Button, Form } from 'antd';

export default function OAuthForm() {
	return (
		<Form>
			<Form.Item style={{ marginBottom: '14px' }}>
				<Button type="primary" htmlType="submit" className="w-full">
					GitHub
				</Button>
			</Form.Item>

			<Form.Item style={{ marginBottom: '0px' }}>
				<Button type="primary" htmlType="submit" className="w-full">
					Google
				</Button>
			</Form.Item>
		</Form>
	);
}
