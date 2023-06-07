import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "../styles/filepond.css"

export default function FileDropZone() {
  return (
    <FilePond
      allowMultiple={false}
      files={[]}
      onupdatefiles={(fileItems) => {
        // обрабатываем выбранные файлы
      }}
      labelIdle='Перетащите сюда файл или <span class="filepond--label-action">Выберите его</span>. Разрешены форматы PDF или DOC.'
      style={{ height: '100%', width: '100%' }}
    />
  );
}
