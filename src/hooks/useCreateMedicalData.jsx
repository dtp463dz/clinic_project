import {
    createNewBodyPart, createNewDrug, createNewMedicinal,
    createNewSymptom, getAllBodyPart, getAllDrug, getAllMedicinal, getAllSymptom
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
    return { createData, getAllData }
}

export default useCreateMedicalData;