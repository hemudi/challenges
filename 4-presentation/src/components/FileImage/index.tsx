interface FileImageProps {
  file: File;
  size?: "large" | "small";
}

const imageSize = {
  large: "w-full h-full",
  small: "w-14 h-14",
};

const FileImage = ({ file, size = "small" }: FileImageProps) => {
  return <img className={`${imageSize[size]}`} src={URL.createObjectURL(file)} alt={file.name} />;
};

export default FileImage;
