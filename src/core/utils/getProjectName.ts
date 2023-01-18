export default function getProjectName(text: string | undefined): string{
    return text === 'inbox' ? 'Не отсортировано' : text ?? '';
}