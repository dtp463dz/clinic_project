import { useState } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import ImageUpload from "../../ImageUpload";
import CustomDatePicker from "../../../Input/CustomDatePicker";
import { format, startOfDay } from 'date-fns'; // format lai ngay
import { createNewHandBook } from "../../../../services/hanbookService";


const mdParser = new MarkdownIt(/* Markdown-it options */);
const ManageHandBook = () => {
    const [image, setImage] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());

    const [formBook, setFormBook] = useState({
        author: '',
        title: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        publicationDate: format(new Date(), 'yyyy-MM-dd'),
    })
    const reSetForm = () => {
        setImage('');
        setCurrentDate(new Date());
        setFormBook({
            author: '',
            title: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            publicationDate: format(new Date(), 'yyyy-MM-dd'),
        })
    }
    const handleImageChange = (base64) => {
        setImage(base64);
    };
    const handleEditorChange = ({ html, text }) => {
        setFormBook(prevState => ({
            ...prevState,
            descriptionHTML: html,
            descriptionMarkdown: text
        }))
    }
    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
        setFormBook(prevState => ({
            ...prevState,
            publicationDate: date ? format(startOfDay(date), 'yyyy-MM-dd') : ''
        }));
        console.log('Selected date:', format(date, 'dd/MM/yyyy'), date.getTime());
    };
    const handleOnChangeInput = (event, id) => {
        const valueInput = event.target.value;
        setFormBook(prevState => ({
            ...prevState,
            [id]: valueInput
        }))
    }
    const handleSaveHandBook = async () => {
        try {
            // Chuyển publicationDate thành timestamp (chuẩn hóa về đầu ngày)
            let publicationDateTimestamp = null;
            if (formBook.publicationDate) {
                const parsedDate = new Date(formBook.publicationDate);
                if (!isNaN(parsedDate.getTime())) {
                    publicationDateTimestamp = startOfDay(parsedDate).getTime();
                } else {
                    toast.error('Ngày xuất bản không hợp lệ');
                    return;
                }
            } else {
                toast.error('Vui lòng chọn ngày xuất bản');
                return;
            }
            const data = {
                author: formBook.author,
                title: formBook.title,
                descriptionHTML: formBook.descriptionHTML,
                descriptionMarkdown: formBook.descriptionMarkdown,
                publicationDate: publicationDateTimestamp,
                lastUpdateDate: publicationDateTimestamp,
                image: image,
            }
            // call api
            let res = await createNewHandBook(data);
            if (res && res.errCode === 0) {
                toast.success('Tạo cẩm nang thành công');
                reSetForm();
            } else {
                toast.error('Tạo cẩm nang thất bại');
            }

        } catch (error) {
            console.error('Lỗi khi gọi API: ', error);
        }
    }


    return (
        <div className="manage-specialty-container">
            <div className="ms-title">Quản lý cẩm nang</div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group my-3">
                    <label className='title-label mb-2'>Tên cẩm nang</label>
                    <input
                        className="form-control"
                        type="text"
                        value={formBook.title}
                        onChange={(event) => handleOnChangeInput(event, 'title')}

                    />
                </div>
                <div className="col-6 form-group my-3">
                    <label className='title-label mb-2'>Tên tác giả</label>
                    <input
                        className="form-control"
                        type="text"
                        value={formBook.author}
                        onChange={(event) => handleOnChangeInput(event, 'author')}
                    />
                </div>

                <div className="col-6 form-group my-3">
                    <label className="title-label mb-2">Ảnh cẩm nang</label>
                    <ImageUpload onImageChange={handleImageChange} initialImage={image} />
                </div>
                <div className="col-6 form-group my-3">
                    <div className="title-label">Ngày Xuất Bản</div>
                    <CustomDatePicker
                        onChange={handleOnChangeDatePicker}
                        value={currentDate}
                    />

                </div>
                <div className='specialty-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={formBook.descriptionMarkdown}
                    />
                </div>
                <div className="col-12 my-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveHandBook}
                    >Lưu</button>
                </div>
            </div>

        </div>
    )
}

export default ManageHandBook;