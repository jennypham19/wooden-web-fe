import InputText from "@/components/InputText";

interface ViewFeedbackUnderRatingFiveStarProps{
    item: string | null;
    onInputChange: (name: string, value: any) => void,
    error: string | undefined
}

const ViewFeedbackUnderRatingFiveStar = (props : ViewFeedbackUnderRatingFiveStarProps) => {
    const { item, onInputChange, error } = props;
    return(
        <InputText
            name="staffNote"
            label="Ghi chú nội bộ"
            multiline
            rows={3}
            type="text"
            value={item}
            onChange={onInputChange}
            placeholder="Ghi lại những mục cần chú ý (nếu có)..."
            error={!!error}
            helperText={error}
        />
    )
}

export default ViewFeedbackUnderRatingFiveStar;