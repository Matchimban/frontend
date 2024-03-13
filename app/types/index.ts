export interface ResponseData<T> {
	code: number;
	msg: string | null;
	result: T;
}
