interface FileImageProps {
  file: File;
  className?: string;
}

const FileImage = ({ file, className }: FileImageProps) => {
  return <img className={className} src={URL.createObjectURL(file)} alt={file.name} />;
};

export default FileImage;
