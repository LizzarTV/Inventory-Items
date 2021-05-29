export function NotEmptyStringValidation(value: string): boolean {
    if (value === '') {
        return true;
    }
    return false;
}