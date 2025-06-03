import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctor, getRequiredDoctorInfor, saveDetailDoctor } from '../../../../redux/action/adminAction';
import { getDetailInforDoctor } from '../../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManageDoctor = () => {
    // save to markdown table
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [description, setDescription] = useState("");
    const [isEdit, setIsEdit] = useState(false); // hide show edit, save btn
    const allDoctors = useSelector((state) => state.admin.allDoctors)
    const [listDoctors, setListDoctors] = useState([])

    // save to doctor_infor table
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [nameClinic, setNameClinic] = useState("");
    const [addressClinic, setAddressClinic] = useState("");
    const [note, setNote] = useState("");

    const allRequiredDoctorInfor = useSelector((state) => state.admin.allRequiredDoctorInfor);
    // Xử lý thay đổi nội dung Markdown
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }
    // reset form
    const resetForm = () => {
        setSelectedDoctor(null); // Reset về null cho react-select
        setContentHTML('');
        setContentMarkdown('');
        setDescription(''); // Reset description
        setIsEdit(false);
        setSelectedPrice(null);
        setSelectedPayment(null);
        setSelectedProvince(null);
        setNameClinic('');
        setAddressClinic('');
        setNote('');
    };
    const handleSaveContentMarkdown = () => {
        console.log('State values:', {
            contentMarkdown,
            contentHTML,
            selectedDoctor,
            description,
            listDoctors,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            nameClinic,
            addressClinic,
            note,
        });

        dispatch(saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
            action: isEdit === true ? "EDIT" : "CREATE",
            priceId: selectedPrice.value,
            paymentId: selectedPayment.value,
            provinceId: selectedProvince.value,
            nameClinic: nameClinic || '',
            addressClinic: addressClinic || '',
            note: note || '',
        }));
        resetForm()
    }
    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption)
        let res = await getDetailInforDoctor(selectedOption.value) // lay thong tin chi tiet bac si
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            // let doctor_infor = res.data.Doctor_Infor; 
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '';
            let selectedPayment = '', selectedPrice = '', selectedProvince = ''
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;

                // tim item 
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                console.log('check findItem find arrray: ', selectedPayment, selectedPrice, selectedProvince)
            }
            setContentMarkdown(markdown.contentMarkdown)
            setContentHTML(markdown.contentMarkdown)
            setDescription(markdown.description);
            setIsEdit(true);
            // fill data vào select, input
            setAddressClinic(addressClinic);
            setNameClinic(nameClinic);
            setNote(note)
            setSelectedPrice(selectedPrice);
            setSelectedPayment(selectedPayment);
            setSelectedProvince(selectedProvince)
        } else {
            setContentMarkdown('');
            setContentHTML('');
            setDescription('');
            setIsEdit(false);

            setAddressClinic('');
            setNameClinic('');
            setNote('')
            setSelectedPrice('');
            setSelectedPayment('');
            setSelectedProvince('');
        }
        console.log('Option selected:', res);
    }
    // handleChangeSelectDoctorInfor Hàm xử lý sự kiện khi người dùng chọn option từ các Select (giá, phương thức thanh toán, tỉnh thành)
    const handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        console.log('check new select on change: ', selectedOption, stateName)
        // Dựa vào tên state, cập nhật state tương ứng với giá trị mới được chọn
        switch (stateName) {
            case 'selectedPrice':
                setSelectedPrice(selectedOption);
                break;
            case 'selectedPayment':
                setSelectedPayment(selectedOption);
                break;
            case 'selectedProvince':
                setSelectedProvince(selectedOption);
                break;
            default:
                break;
        }
    }
    const handleOnChangeText = (event, id) => {
        const value = event.target.value;
        console.log(`handleOnChangeText: id = ${id}, value = ${value}`);
        switch (id) {
            case 'description':
                setDescription(value);
                break;
            case 'nameClinic':
                setNameClinic(value);
                break;
            case 'addressClinic':
                setAddressClinic(value);
                break;
            case 'note':
                setNote(value);
                break;
            default:
                console.warn(`Unhandled input id: ${id}`);
                break;
        }

        // console.log('description', event.target.value)
    }

    const dispatch = useDispatch();
    // Lấy danh sách bác sĩ khi component mount
    useEffect(() => {
        dispatch(fetchAllDoctor());
        dispatch(getRequiredDoctorInfor());
    }, [dispatch])

    // data input select
    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'DOCTORS') {
                inputData.map((item) => {
                    let object = {};
                    let label = `${item.firstName} ${item.lastName}`;
                    object.label = label;
                    object.value = item.id;
                    result.push(object);
                })
            } else if (type === 'PRICE' || type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item) => {
                    let object = {};
                    let label = `${item.valueVi}`;
                    object.label = label;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
        }
        return result;
    }

    // Cập nhật danh sách bác sĩ cho Select
    useEffect(() => {
        if (allDoctors && allDoctors.length > 0) {
            let dataSelect = buildDataInputSelect(allDoctors, 'DOCTORS');
            setListDoctors(dataSelect)
        }
        if (allRequiredDoctorInfor && allRequiredDoctorInfor.resPayment) {
            let { resPayment, resPrice, resProvince } = allRequiredDoctorInfor;
            let dataSelectPrice = buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = buildDataInputSelect(resProvince, 'PROVINCE');
            console.log('data new: ', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            setListPrice(dataSelectPrice);
            setListPayment(dataSelectPayment);
            setListProvince(dataSelectProvince);

        }
    }, [allDoctors, allRequiredDoctorInfor])


    return (
        <div className='manage-doctor-container'>
            <div className='title'>Thêm Thông Tin Bác Sĩ</div>
            <div className='more-infor'>
                <div className='content-left form-group'>
                    <div className='title-label mb-2'>Chọn Bác Sĩ</div>
                    <Select
                        options={listDoctors}
                        value={selectedDoctor}
                        onChange={handleChangeSelect}
                        placeholder={'Chọn bác sĩ'}
                    />

                </div>
                <div className='content-right'>
                    <div className='title-label mb-2'>Thông tin giới thiệu</div>
                    <textarea className='form-control' rows="4"
                        value={description}
                        onChange={(event) => handleOnChangeText(event, 'description')}>
                    </textarea>
                </div>
            </div>
            <div className='more-infor-extra row'>
                <div className='col-4 form-group'>
                    <label className='title-label mb-2'>Chọn giá</label>
                    <Select
                        options={listPrice}
                        value={selectedPrice}
                        onChange={handleChangeSelectDoctorInfor}
                        placeholder={'Chọn giá'}
                        name='selectedPrice'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label className='title-label mb-2'>Chọn phương thức thanh toán</label>
                    <Select
                        options={listPayment}
                        value={selectedPayment}
                        onChange={handleChangeSelectDoctorInfor}
                        placeholder={'Chọn phương thức thanh toán'}
                        name='selectedPayment'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label className='title-label mb-2'>Chọn tỉnh thành</label>
                    <Select
                        options={listProvince}
                        value={selectedProvince}
                        onChange={handleChangeSelectDoctorInfor}
                        placeholder={'Chọn tỉnh thành'}
                        name='selectedProvince'
                    />
                </div>
                <div className='col-4 form-group mt-2'>
                    <label className='title-label mb-2'>Tên phòng khám</label>
                    <input className='form-control'
                        value={nameClinic || ''}
                        onChange={(event) => handleOnChangeText(event, 'nameClinic')}
                    />
                </div>
                <div className='col-4 form-group mt-2'>
                    <label className='title-label mb-2'>Địa chỉ phòng khám</label>
                    <input className='form-control'
                        value={addressClinic || ''}
                        onChange={(event) => handleOnChangeText(event, 'addressClinic')}
                    />
                </div>
                <div className='col-4 form-group mt-2'>
                    <label className='title-label mb-2'>Note</label>
                    <input className='form-control'
                        value={note || ''}
                        onChange={(event) => handleOnChangeText(event, 'note')}
                    />
                </div>
            </div>
            <div className='manage-doctor-editor'>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />
            </div>
            <button
                className={isEdit ? "save-content-doctor btn btn-warning" : "save-content-doctor btn btn-primary"}
                onClick={() => handleSaveContentMarkdown()}
            >
                {isEdit ? "Sửa thông tin" : "Lưu thông tin"}</button>
        </div>
    )
}
export default ManageDoctor;