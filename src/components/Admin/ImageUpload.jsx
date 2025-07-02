import { FcPlus } from "react-icons/fc";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useState } from "react";
import CommonUtils from "../../utils/commonUtils"; // Đảm bảo đường dẫn đúng
import "./ImageUpload.scss";

const ImageUpload = ({ onImageChange, initialImage }) => {
    const [previewImage, setPreviewImage] = useState(initialImage || "");
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    const [image, setImage] = useState("");

    // Đồng bộ previewImage với initialImage khi initialImage thay đổi
    useEffect(() => {
        console.log('Initial image:', initialImage); // Debug
        setPreviewImage(initialImage || "");
        setImage(initialImage || "");
    }, [initialImage]);

    // Xử lý upload ảnh
    const handleUploadImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            // Chuyển đổi file sang base64
            let base64 = await CommonUtils.getBase64(file);
            // Hiển thị ảnh preview
            setPreviewImage(URL.createObjectURL(file));
            setImage(base64);
            // Trả dữ liệu ảnh base64 về parent component
            onImageChange(base64);
        }
    };

    return (
        <div className="image-upload-container">
            <label className="label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload File Image
            </label>
            <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
            />
            <div className="preview-image">
                {previewImage ? (
                    <>
                        <img
                            src={previewImage}
                            alt="Preview"
                            onClick={() => setLightBoxOpen(true)}
                        />
                        <Lightbox
                            open={lightBoxOpen}
                            close={() => setLightBoxOpen(false)}
                            slides={[{ src: previewImage }]}
                        />
                    </>
                ) : (
                    <span>Preview Image</span>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;