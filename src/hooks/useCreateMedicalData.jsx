import {
    createNewBodyPart, createNewDrug, createNewMedicinal,
    createNewSymptom, deleteBodyPart, deleteDrug, deleteMedicinal, deleteSymptom, getAllBodyPart, getAllDrug, getAllMedicinal, getAllSymptom,
    updateBodyPart,
    updateDrug,
    updateMedicinal,
    updateSymptom
} from "../services/medicalDataService";

const useCreateMedicalData = () => {
    const createData = async (entityType, data) => {
        try {
            let res;
            switch (entityType) {
                case 'symptoms':
                    res = await createNewSymptom(data);
                    break;
                case 'drugs':
                    res = await createNewDrug(data);
                    break;
                case 'herbs':
                    res = await createNewMedicinal(data);
                    break;
                case 'bodyParts':
                    res = await createNewBodyPart(data);
                    break;
                default:
                    throw new Error('Loại đối tượng không hợp lệ')
            }
            return res;

        } catch (error) {
            console.error(`Lỗi khi tạo ${entityType}: `, error)
        }
    }
    const getAllData = async (entityType, page = 1, limit = 10) => {
        try {
            let res;
            switch (entityType) {
                case 'symptoms':
                    res = await getAllSymptom(page, limit);
                    break;
                case 'drugs':
                    res = await getAllDrug(page, limit);
                    break;
                case 'herbs':
                    res = await getAllMedicinal(page, limit);
                    break;
                case 'bodyParts':
                    res = await getAllBodyPart(page, limit);
                    break;
                default:
                    break;
            }
            return res
        } catch (error) {
            console.error(`Lỗi khi lấy danh sách ${entityType}:`, error);
            throw error;
        }
    }
    const updateData = async (entityType, data) => {
        try {
            let res;
            switch (entityType) {
                case 'symptoms':
                    res = await updateSymptom(data);
                    break;
                case 'drugs':
                    res = await updateDrug(data);
                    break;
                case 'herbs':
                    res = await updateMedicinal(data);
                    break;
                case 'bodyParts':
                    res = await updateBodyPart(data);
                    break;
                default:
                    throw new Error('Loại đối tượng không hợp lệ');
            }
            return res;
        } catch (error) {
            console.error(`Lỗi khi cập nhật ${entityType}: `, error);
            throw error;
        }
    };
    const deleteData = async (entityType, id) => {
        try {
            let res;
            switch (entityType) {
                case 'symptoms':
                    res = await deleteSymptom(id);
                    break;
                case 'drugs':
                    res = await deleteDrug(id);
                    break;
                case 'herbs':
                    res = await deleteMedicinal(id);
                    break;
                case 'bodyParts':
                    res = await deleteBodyPart(id);
                    break;
                default:
                    throw new Error('Loại đối tượng không hợp lệ');
            }
            return res;
        } catch (error) {
            console.error(`Lỗi khi xóa ${entityType}: `, error);
            throw error;
        }
    };
    return { createData, getAllData, updateData, deleteData }
}

export default useCreateMedicalData;