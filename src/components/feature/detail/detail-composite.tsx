// Address repeating implementation - This is NOT a one all be all component
// There could be some situation that this component is not enough.

import { CommonProps } from "@/lib/types";
import {
  DetailPanelLabel,
  DetailPanelLabelGroup,
  DetailPanelLine,
  DetailPanelValue,
} from "./detail-panel";
export const DetailComposite = ({
  label,
  value,
}: CommonProps & {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <DetailPanelLabelGroup>
        <DetailPanelLabel>{label}</DetailPanelLabel>
        <DetailPanelLine />
      </DetailPanelLabelGroup>
      <DetailPanelValue>{value}</DetailPanelValue>
    </div>
  );
};
