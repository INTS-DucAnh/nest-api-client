export default function ConvertFileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        res(reader.result as string);
      } else {
        rej(null);
      }
    };
    reader.onerror = () => {
      rej(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}
