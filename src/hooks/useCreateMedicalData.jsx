import { createNewBodyPart, createNewDrug, createNewMedicinal, createNewSymptom } from "../services/medicalDataService";

const useCreateMedicalData = () => {
    const createData = async (entityType, data) => {
        try {
            let res;
            switch (entityType) {
                case 'symptom':
                    res = await createNewSymptom(data);
                    break;
                case 'drug':
                    res = await createNewDrug(data);
                    break;
                case 'medicinal':
                    res = await createNewMedicinal(data);
                    break;
                case 'bodypart':
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
    return { createData }
}

export default useCreateMedicalData;